import { Injectable } from '@angular/core';
import { Configuration, OpenAIApi } from 'openai';
import { from } from 'rxjs';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OpenAPIService {
  constructor() {}
  readonly configuration = new Configuration({
    apiKey: environment.openAIApiKey,
  });

  readonly openai = new OpenAIApi(this.configuration);

  getDataFromOpenAI(prompt?: string) {
    return from(this.openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 700,
      temperature: 0.8,
    }))
  }

}