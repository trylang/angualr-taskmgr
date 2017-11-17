import { Inject, Injectable } from "@angular/core";
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { Project, User } from '../domain';

@Injectable()
export class ProjectService {
  private readonly domain = 'projects';
  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  constructor(
    @Inject('BASE_CONFIG') private config, 
    private http: Http) {
  }
  
  // POST /projects
  add(project: Project): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .post(uri, JSON.stringify(project), {headers: this.headers})
      .map(res => res.json());
  }

  //PUT /projects
  update(project: Project): Observable<Project> {
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    const toUpdate = {
      name: project.name,
      coverImg: project.coverImg,
      desc: project.desc
    };
    return this.http
      .patch(uri, JSON.stringify(toUpdate), {headers: this.headers})
      .map(res => res.json());
  }

  //DELETE /projects 
  del(project: Project): Observable<Project> {
    const deltask$ = Observable.from(project.taskLists? project.taskLists : [])
      .mergeMap(listId => this.http
        .delete(`${this.config.uri}/taskLists/${project.id}`)
        .count());
    const uri = `${this.config.uri}/${this.domain}/${project.id}`;
    return deltask$.switchMap(p => this.http
      .delete(uri)
      .map(_=> project));
  }

  //GET /projects
  get(userId: string): Observable<Project[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, {params: {'members_link': userId}, headers: this.headers})
      .map(res => res.json() as Project[]);
  }

}