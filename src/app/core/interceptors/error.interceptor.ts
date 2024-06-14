import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, of, retry, throwError, timer } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import { ProgressStatusFacade } from '../facades/progress-status.facade';
import { OperationStatusService } from '../services/operation-status.service';
import { errorStyle } from '../services/status-style-names';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private operationStatusService: OperationStatusService,
    private logger: NGXLogger,
    private progressStatusFacade: ProgressStatusFacade,
  ) {}

  shouldRetry(error: any, retryCount: number) {
    if (error.status >= 500) {
      return timer(retryCount * 500);
    }
    throw error;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      retry({
        count: 2,
        delay: this.shouldRetry,
      }),
      catchError((error) => {
        this.logger.error(error);

        this.progressStatusFacade.dispatchSetProgessOff();

        if (error instanceof HttpErrorResponse) {
          if (error.status === 0) {
            this.operationStatusService.displayStatus(
              `Something went wrong, ${error.error.title}`,
              errorStyle,
            );
          } else if (error.status == 401 || error.status == 403) {
            this.operationStatusService.displayStatus(
              error.error.error,
              errorStyle,
            );
          } else if (error.status == 400) {
            if (error.error.errors) {
              for (var key in error.error.errors) {
                this.operationStatusService.displayStatus(
                  error.error.errors[key][0],
                  errorStyle,
                );
                break;
              }
            } else {
              this.operationStatusService.displayStatus(
                error.error.error,
                errorStyle,
              );
            }
          } else {
            this.operationStatusService.displayStatus(
              error.error.error,
              errorStyle,
            );
          }
          return of();
        }
        return throwError(() => {
          this.operationStatusService.displayStatus(
            error.error.error,
            errorStyle,
          );
        });
      }),
    );
  }
}
