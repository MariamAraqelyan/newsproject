import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { IMetaData } from './meta.interface';

@Injectable({
  providedIn: 'root'
})
export class MetaService {

  constructor(
    private Title: Title,
    private Meta: Meta
  ) { }

  public setMetaData(data: IMetaData = {}): void {
    Object.keys(data).forEach((key) => {
      if (key === 'title') {
        return this.Title.setTitle(data[key]);
      }
      this.Meta.updateTag( { name: key, content: data[key] });
    });
  }
}
