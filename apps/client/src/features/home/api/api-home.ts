import { apiRequest } from '@/lib/api';
import { ApplicationsResponse, ApplicationStats } from '../types/home';

export class ApplicationService {
  private static BASE_PATH = '/users-jobs/developers';
  private static auxToken =
    'eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDIyMkFBQSIsImtpZCI6Imluc18ycEZ2Y3JTS1hvQzgwVVJmcUY2bTVMTFRBcXQiLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwczovL3N1YnRsZS1ncmlmZm9uLTk5LmFjY291bnRzLmRldiIsImV4cCI6MjA0Nzc0NTY1MCwiaWF0IjoxNzMyMzg1NjUwLCJpc3MiOiJodHRwczovL3N1YnRsZS1ncmlmZm9uLTk5LmNsZXJrLmFjY291bnRzLmRldiIsImp0aSI6ImU4MTJiNmM4MDY0ZjQwNDdiYzcyIiwibWV0YWRhdGEiOnsib25ib2FyZGluZ0NvbXBsZXRlIjp0cnVlLCJyb2xlIjoiZGV2ZWxvcGVyIn0sIm5iZiI6MTczMjM4NTY0NSwic3ViIjoidXNlcl8ycEZ3NnlVZzR5RHNiRG5pNzRsNWdqVTdYalYifQ.WEUTnLgYbwEt40M8XVqENUsKjkSjvwurNEtQKwR5fAGh4Zpowk3HLKCxaTso4cHxYxnWxoIdUNnrJL3U8C9FgirEMICtbVcBD3hVkHkRpO9QbGm8Qvx6y-pJZOsXekSpFxwV3fnYT0qf3obU9yHxGp1MotbUkEN8myWFRdUBP7u2maa_zx51sAxSCEHUgzz1FkAB9qaIzLuBBSKfEwHjySl1zmhq3d2p3cEmCntbZRQLyIGi1Do-cCyJZQHCeXKf41PViGqkWW_dSO5ZTQOt3sWLInPYQoeLYqQTd_LGxTbGfqsy8AxgL6PSmqXgvT02iaKkV01GLBhwlj1VNqEn-w';
  static async getApplications(
    developerId: string,
    token: string,
    params?: {
      status?: 'Published' | 'Viewed' | 'Accepted' | 'Rejected';
      page?: number;
      pageSize?: number;
    },
  ) {
    console.log(token);
    return apiRequest<ApplicationsResponse>({
      endpoint: `${this.BASE_PATH}/${developerId}/applications`,
      method: 'GET',
      token: this.auxToken,
      params,
    });
  }

  static async getStats(developerId: string, token: string) {
    console.log(token);

    return apiRequest<ApplicationStats>({
      endpoint: `${this.BASE_PATH}/${developerId}/applications/stats`,
      method: 'GET',
      token: this.auxToken,
    });
  }
}
