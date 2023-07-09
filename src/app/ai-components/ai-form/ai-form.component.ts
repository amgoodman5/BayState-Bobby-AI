import { Component, OnDestroy } from '@angular/core';
import { OpenAPIService } from 'src/app/services/open-api.service';
import { tap, BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Configuration, OpenAIApi } from 'openai';
import { switchMap } from 'rxjs';
import { environment } from 'environments/environment';
export class textResponse {
  sno: number = 1;
  text: string = '';
  response: any = '';
}


@Component({
  selector: 'app-ai-form',
  templateUrl: './ai-form.component.html',
  styleUrls: ['./ai-form.component.scss']
})
export class AiFormComponent implements OnDestroy {
  text?: string;
  loading$ = new BehaviorSubject<boolean>(false);
  readonly configuration = new Configuration({
    apiKey: environment.openAIApiKey
  });

  readonly openai = new OpenAIApi(this.configuration);
  textList: textResponse[] = [{ sno: 1, text: '', response: '' }];

  constructor(private openaiService: OpenAPIService) { }
  private destroy$ = new Subject();


  generateText(data: textResponse) {
    const prompt = `### ${environment.promptInstuctions} ### Text: """${data.text}"""`
    this.openaiService.getDataFromOpenAI(prompt)
      .pipe(
        tap(() => this.loading$.next(true)),
        takeUntil(this.destroy$))
      .subscribe(text => {
        setTimeout(() => {
          this.loading$.next(false);
        }, 200);
        data.response = text.data.choices[0].text;
      });
  }
  createNewQuestion() {
    this.textList.push({ sno: 1, text: '', response: '' });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}