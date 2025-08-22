import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export interface language {
  icon: string;
  code: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class I18nService {
  public languages: language[] = [
    { icon: 'fv-flag-usa', code: 'en_US', name: 'English (US)' },
    { icon: 'fv-flag-germany', code: 'de_DE', name: 'Deutsch (DE)' },
    { icon: 'fv-flag-france', code: 'fr_FR', name: 'Français (FR)' },
    { icon: 'fv-flag-india', code: 'hi_IN', name: 'हिन्दी (IN)' },
    { icon: 'fv-flag-saudi-arabia', code: 'ar_AA', name: 'العربية (AA)' },
    { icon: 'fv-flag-spain', code: 'es_ES', name: 'Español (ES)' },
    { icon: 'fv-flag-india', code: 'ta_IN', name: 'தமிழ் (IN)' },
    { icon: 'fv-flag-india', code: 'te_IN', name: 'తెలుగు (IN)' },
    { icon: 'fv-flag-india', code: 'ur_IN', name: 'اردو (IN)' }
  ];

  constructor(private translate: TranslateService) {
    const langCodes = this.languages.map(lang => lang.code);
    this.translate.addLangs(langCodes);
    this.translate.setDefaultLang('en_US');

    const savedLang = localStorage.getItem('preferredLanguage');
    const browserLang = this.translate.getBrowserLang();
    const fallbackLang = 'en_US';
    const useLang = langCodes.includes(savedLang || '') 
      ? savedLang!
      : langCodes.includes(browserLang || '') 
        ? browserLang! 
        : fallbackLang;

    this.translate.use(useLang);
    this.setDirection(useLang);
  }

  changeLanguage(lang: string) {
    this.translate.use(lang);
    localStorage.setItem('preferredLanguage', lang);
    this.setDirection(lang);
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang || this.translate.getDefaultLang();
  }

  private setDirection(lang: string) {
    const dir = lang.startsWith('ar') ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
  }

}
