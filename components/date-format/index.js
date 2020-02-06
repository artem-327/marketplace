import moment from 'moment'

/*
    All date formats are from https://en.wikipedia.org/wiki/Date_format_by_country 
    and changed(CAPITAL LETTERS) 'Tokens'(dd, mm, yyyy) based on moment library https://momentjscom.readthedocs.io/en/latest/moment/04-displaying/01-format/
    Returns string short date format based on country (For example: 'D. M. YYYY')
*/
export const getLocaleDateFormat = () => {
  if (typeof navigator === 'undefined') {
    return
  }
  const formats = {
    'ar-SA': 'DD/MM/YY',
    'bg-BG': 'DD.M.YYYY',
    'ca-ES': 'DD/MM/YYYY',
    'zh-TW': 'YYYY/M/D',
    'cs-CZ': 'D. M. YYYY',
    'da-DK': 'DD-MM-YYYY',
    'de-DE': 'DD.MM.YYYY',
    'el-GR': 'D/M/YYYY',
    'en-US': 'M/D/YYYY',
    'fi-FI': 'D.M.YYYY',
    'fr-FR': 'DD/MM/YYYY',
    'he-IL': 'DD/MM/YYYY',
    'hu-HU': 'YYYY. MM. DD.',
    'is-IS': 'D.M.YYYY',
    'it-IT': 'DD/MM/YYYY',
    'ja-JP': 'YYYY/MM/DD',
    'ko-KR': 'YYYY-MM-DD',
    'nl-NL': 'D-M-YYYY',
    'nb-NO': 'DD.MM.YYYY',
    'pl-PL': 'YYYY-MM-DD',
    'pt-BR': 'D/M/YYYY',
    'ro-RO': 'DD.MM.YYYY',
    'ru-RU': 'DD.MM.YYYY',
    'hr-HR': 'D.M.YYYY',
    'sk-SK': 'D. M. YYYY',
    'sq-AL': 'YYYY-MM-DD',
    'sv-SE': 'YYYY-MM-DD',
    'th-TH': 'D/M/YYYY',
    'tr-TR': 'DD.MM.YYYY',
    'ur-PK': 'DD/MM/YYYY',
    'id-ID': 'DD/MM/YYYY',
    'uk-UA': 'DD.MM.YYYY',
    'be-BY': 'DD.MM.YYYY',
    'sl-SI': 'D.M.YYYY',
    'et-EE': 'D.MM.YYYY',
    'lv-LV': 'YYYY.MM.DD.',
    'lt-LT': 'YYYY.MM.DD',
    'fa-IR': 'MM/DD/YYYY',
    'vi-VN': 'DD/MM/YYYY',
    'hy-AM': 'DD.MM.YYYY',
    'az-Latn-AZ': 'DD.MM.YYYY',
    'eu-ES': 'YYYY/MM/DD',
    'mk-MK': 'DD.MM.YYYY',
    'af-ZA': 'YYYY/MM/DD',
    'ka-GE': 'DD.MM.YYYY',
    'fo-FO': 'DD-MM-YYYY',
    'hi-IN': 'DD-MM-YYYY',
    'ms-MY': 'DD/MM/YYYY',
    'kk-KZ': 'DD.MM.YYYY',
    'ky-KG': 'DD.MM.YY',
    'sw-KE': 'M/D/YYYY',
    'uz-Latn-UZ': 'DD/MM YYYY',
    'tt-RU': 'DD.MM.YYYY',
    'pa-IN': 'DD-MM-YY',
    'gu-IN': 'DD-MM-YY',
    'ta-IN': 'DD-MM-YYYY',
    'te-IN': 'DD-MM-YY',
    'kn-IN': 'DD-MM-YY',
    'mr-IN': 'DD-MM-YYYY',
    'sa-IN': 'DD-MM-YYYY',
    'mn-MN': 'YY.MM.DD',
    'gl-ES': 'DD/MM/YY',
    'kok-IN': 'DD-MM-YYYY',
    'syr-SY': 'DD/MM/YYYY',
    'dv-MV': 'DD/MM/YY',
    'ar-IQ': 'DD/MM/YYYY',
    'zh-CN': 'YYYY/M/D',
    'de-CH': 'DD.MM.YYYY',
    'en-GB': 'DD/MM/YYYY',
    'es-MX': 'DD/MM/YYYY',
    'fr-BE': 'D/MM/YYYY',
    'it-CH': 'DD.MM.YYYY',
    'nl-BE': 'D/MM/YYYY',
    'nn-NO': 'DD.MM.YYYY',
    'pt-PT': 'DD-MM-YYYY',
    'sr-Latn-CS': 'D.M.YYYY',
    'sv-FI': 'D.M.YYYY',
    'az-Cyrl-AZ': 'DD.MM.YYYY',
    'ms-BN': 'DD/MM/YYYY',
    'uz-Cyrl-UZ': 'DD.MM.YYYY',
    'ar-EG': 'DD/MM/YYYY',
    'zh-HK': 'D/M/YYYY',
    'de-AT': 'DD.MM.YYYY',
    'en-AU': 'D/MM/YYYY',
    'es-ES': 'DD/MM/YYYY',
    'fr-CA': 'YYYY-MM-DD',
    'sr-Cyrl-CS': 'D.M.YYYY',
    'ar-LY': 'DD/MM/YYYY',
    'zh-SG': 'D/M/YYYY',
    'de-LU': 'DD.MM.YYYY',
    'en-CA': 'DD/MM/YYYY',
    'es-GT': 'DD/MM/YYYY',
    'fr-CH': 'DD.MM.YYYY',
    'ar-DZ': 'DD-MM-YYYY',
    'zh-MO': 'D/M/YYYY',
    'de-LI': 'DD.MM.YYYY',
    'en-NZ': 'D/MM/YYYY',
    'es-CR': 'DD/MM/YYYY',
    'fr-LU': 'DD/MM/YYYY',
    'ar-MA': 'DD-MM-YYYY',
    'en-IE': 'DD/MM/YYYY',
    'es-PA': 'MM/DD/YYYY',
    'fr-MC': 'DD/MM/YYYY',
    'ar-TN': 'DD-MM-YYYY',
    'en-ZA': 'YYYY/MM/DD',
    'es-DO': 'DD/MM/YYYY',
    'ar-OM': 'DD/MM/YYYY',
    'en-JM': 'DD/MM/YYYY',
    'es-VE': 'DD/MM/YYYY',
    'ar-YE': 'DD/MM/YYYY',
    'en-029': 'MM/DD/YYYY',
    'es-CO': 'DD/MM/YYYY',
    'ar-SY': 'DD/MM/YYYY',
    'en-BZ': 'DD/MM/YYYY',
    'es-PE': 'DD/MM/YYYY',
    'ar-JO': 'DD/MM/YYYY',
    'en-TT': 'DD/MM/YYYY',
    'es-AR': 'DD/MM/YYYY',
    'ar-LB': 'DD/MM/YYYY',
    'en-ZW': 'M/D/YYYY',
    'es-EC': 'DD/MM/YYYY',
    'ar-KW': 'DD/MM/YYYY',
    'en-PH': 'M/D/YYYY',
    'es-CL': 'DD-MM-YYYY',
    'ar-AE': 'DD/MM/YYYY',
    'es-UY': 'DD/MM/YYYY',
    'ar-BH': 'DD/MM/YYYY',
    'es-PY': 'DD/MM/YYYY',
    'ar-QA': 'DD/MM/YYYY',
    'es-BO': 'DD/MM/YYYY',
    'es-SV': 'DD/MM/YYYY',
    'es-HN': 'DD/MM/YYYY',
    'es-NI': 'DD/MM/YYYY',
    'es-PR': 'DD/MM/YYYY',
    'am-ET': 'D/M/YYYY',
    'tzm-Latn-DZ': 'DD-MM-YYYY',
    'iu-Latn-CA': 'D/MM/YYYY',
    'sma-NO': 'DD.MM.YYYY',
    'mn-Mong-CN': 'YYYY/M/D',
    'gd-GB': 'DD/MM/YYYY',
    'en-MY': 'D/M/YYYY',
    'prs-AF': 'DD/MM/YY',
    'bn-BD': 'DD-MM-YY',
    'wo-SN': 'DD/MM/YYYY',
    'rw-RW': 'M/D/YYYY',
    'qut-GT': 'DD/MM/YYYY',
    'sah-RU': 'MM.DD.YYYY',
    'gsw-FR': 'DD/MM/YYYY',
    'co-FR': 'DD/MM/YYYY',
    'oc-FR': 'DD/MM/YYYY',
    'mi-NZ': 'DD/MM/YYYY',
    'ga-IE': 'DD/MM/YYYY',
    'se-SE': 'YYYY-MM-DD',
    'br-FR': 'DD/MM/YYYY',
    'smn-FI': 'D.M.YYYY',
    'moh-CA': 'M/D/YYYY',
    'arn-CL': 'DD-MM-YYYY',
    'ii-CN': 'YYYY/M/D',
    'dsb-DE': 'D. M. YYYY',
    'ig-NG': 'D/M/YYYY',
    'kl-GL': 'DD-MM-YYYY',
    'lb-LU': 'DD/MM/YYYY',
    'ba-RU': 'DD.MM.YY',
    'nso-ZA': 'YYYY/MM/DD',
    'quz-BO': 'DD/MM/YYYY',
    'yo-NG': 'D/M/YYYY',
    'ha-Latn-NG': 'D/M/YYYY',
    'fil-PH': 'M/D/YYYY',
    'ps-AF': 'DD/MM/YY',
    'fy-NL': 'D-M-YYYY',
    'ne-NP': 'M/D/YYYY',
    'se-NO': 'DD.MM.YYYY',
    'iu-Cans-CA': 'D/M/YYYY',
    'sr-Latn-RS': 'D.M.YYYY',
    'si-LK': 'YYYY-MM-DD',
    'sr-Cyrl-RS': 'D.M.YYYY',
    'lo-LA': 'DD/MM/YYYY',
    'km-KH': 'YYYY-MM-DD',
    'cy-GB': 'DD/MM/YYYY',
    'bo-CN': 'YYYY/M/D',
    'sms-FI': 'D.M.YYYY',
    'as-IN': 'DD-MM-YYYY',
    'ml-IN': 'DD-MM-YY',
    'en-IN': 'DD-MM-YYYY',
    'or-IN': 'DD-MM-YY',
    'bn-IN': 'DD-MM-YY',
    'tk-TM': 'DD.MM.YY',
    'bs-Latn-BA': 'D.M.YYYY',
    'mt-MT': 'DD/MM/YYYY',
    'sr-Cyrl-ME': 'D.M.YYYY',
    'se-FI': 'D.M.YYYY',
    'zu-ZA': 'YYYY/MM/DD',
    'xh-ZA': 'YYYY/MM/DD',
    'tn-ZA': 'YYYY/MM/DD',
    'hsb-DE': 'D. M. YYYY',
    'bs-Cyrl-BA': 'D.M.YYYY',
    'tg-Cyrl-TJ': 'DD.MM.YY',
    'sr-Latn-BA': 'D.M.YYYY',
    'smj-NO': 'DD.MM.YYYY',
    'rm-CH': 'DD/MM/YYYY',
    'smj-SE': 'YYYY-MM-DD',
    'quz-EC': 'DD/MM/YYYY',
    'quz-PE': 'DD/MM/YYYY',
    'hr-BA': 'D.M.YYYY.',
    'sr-Latn-ME': 'D.M.YYYY',
    'sma-SE': 'YYYY-MM-DD',
    'en-SG': 'D/M/YYYY',
    'ug-CN': 'YYYY-M-D',
    'sr-Cyrl-BA': 'D.M.YYYY',
    'es-US': 'M/D/YYYY'
  }

  return formats[navigator.language] || 'DD/MM/YYYY'
}

/*
    Parametr is string date short format from getLocaleDateFormat(). For exampl: '21. 6. 2019'
    If pass parametr {
      Returns:
          success: '2019-06-21T00:00:00+02:00'
          failed: 'Invalid date'
          success but wrong date or warning in console: 
              'Deprecation warning: value provided is not in a recognized RFC2822 or ISO format. ...' 
              It means probably used wrong date format.
    } 
    If not pass parametr {
      Returns current string ISO date: 
        success: '2019-12-31T12:10:07+01:00'
    }
*/
export const getStringISODate = (stringDate = '') => {
  if (typeof navigator === 'undefined') {
    return
  }
  let h = '00'
  let m = '00'
  //added better regex expresion for time in string
  const getTime = stringTime => {
    if (!stringTime) return
    const pattern = new RegExp(/[0-1][0-9]:[0-5][0-9]/)
    const resultTime = pattern.exec(stringTime)
    if (resultTime) {
      h = resultTime.toString().split(':')[0]
      m = resultTime.toString().split(':')[1]
    }
  }
  const getYear = stringYear => {
    let resultYear = stringYear
    if (stringYear && stringYear.length === 2) {
      resultYear`20${stringYear}`
    } else if (stringYear && stringYear.length > 4) {
      resultYear = stringYear.substring(0, 4)
      if (stringYear.includes(':')) {
        getTime(stringYear)
      }
    }
    return resultYear
  }

  const getDateYMD = (stringDate, separator) => {
    if (!stringDate || !separator) return
    return `${getYear(stringDate.split(separator)[0])}-${addedZero(stringDate.split(separator)[1])}-${addedZero(
      stringDate.split(separator)[2]
    )}`
  }

  const getDateMDY = (stringDate, separator) => {
    if (!stringDate || !separator) return
    return `${getYear(stringDate.split(separator)[2])}-${addedZero(stringDate.split(separator)[0])}-${addedZero(
      stringDate.split(separator)[1]
    )}`
  }

  const getDateDMY = (stringDate, separator) => {
    if (!stringDate || !separator) return
    return `${getYear(stringDate.split(separator)[2])}-${addedZero(stringDate.split(separator)[1])}-${addedZero(
      stringDate.split(separator)[0]
    )}`
  }

  const addedZero = dayOrMonth => {
    if (!dayOrMonth) return
    if (
      dayOrMonth &&
      dayOrMonth.length === 1 &&
      dayOrMonth.charAt(0) !== 0 &&
      parseInt(dayOrMonth) < 10 &&
      parseInt(dayOrMonth) > 0
    ) {
      return `0${dayOrMonth}`
    } else if (dayOrMonth && dayOrMonth.length > 2 && dayOrMonth.includes(':')) {
      getTime(dayOrMonth)
    }
    return dayOrMonth
  }

  const formats = {
    'ar-SA': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'bg-BG': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'ca-ES': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'zh-TW': { stringISODate: () => moment(getDateYMD(stringDate, '/')).set({ h, m }).format() },
    'cs-CZ': { stringISODate: () => moment(getDateDMY(stringDate, '. ')).set({ h, m }).format()},
    'da-DK': { stringISODate: () => moment(getDateDMY(stringDate, '-')).set({ h, m }).format() },
    'de-DE': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'el-GR': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'en-US': { stringISODate: () => moment(getDateMDY(stringDate, '/')).set({ h, m }).format() },
    'fi-FI': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'fr-FR': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'he-IL': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'hu-HU': { stringISODate: () => moment(getDateYMD(stringDate, '. ')).set({ h, m }).format() },
    'is-IS': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'it-IT': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'ja-JP': { stringISODate: () => moment(getDateYMD(stringDate, '/')).set({ h, m }).format() },
    'ko-KR': { stringISODate: () => moment(getDateYMD(stringDate, '-')).set({ h, m }).format() },
    'nl-NL': { stringISODate: () => moment(getDateDMY(stringDate, '-')).set({ h, m }).format() },
    'nb-NO': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'pl-PL': { stringISODate: () => moment(getDateYMD(stringDate, '-')).set({ h, m }).format() },
    'pt-BR': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'ro-RO': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'ru-RU': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'hr-HR': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'sk-SK': { stringISODate: () => moment(getDateDMY(stringDate, '. ')).set({ h, m }).format() },
    'sq-AL': { stringISODate: () => moment(getDateYMD(stringDate, '-')).set({ h, m }).format() },
    'sv-SE': { stringISODate: () => moment(getDateYMD(stringDate, '-')).set({ h, m }).format() },
    'th-TH': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'tr-TR': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'ur-PK': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'id-ID': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'uk-UA': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'be-BY': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'sl-SI': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'et-EE': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'lv-LV': { stringISODate: () => moment(getDateYMD(stringDate, '.')).set({ h, m }).format() },
    'lt-LT': { stringISODate: () => moment(getDateYMD(stringDate, '.')).set({ h, m }).format() },
    'fa-IR': { stringISODate: () => moment(getDateMDY(stringDate, '/')).set({ h, m }).format() },
    'vi-VN': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'hy-AM': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'az-Latn-AZ': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'eu-ES': { stringISODate: () => moment(getDateYMD(stringDate, '/')).set({ h, m }).format() },
    'mk-MK': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'af-ZA': { stringISODate: () => moment(getDateYMD(stringDate, '/')).set({ h, m }).format() },
    'ka-GE': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'fo-FO': { stringISODate: () => moment(getDateDMY(stringDate, '-')).set({ h, m }).format() },
    'hi-IN': { stringISODate: () => moment(getDateDMY(stringDate, '-')).set({ h, m }).format() },
    'ms-MY': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'kk-KZ': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'ky-KG': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'sw-KE': { stringISODate: () => moment(getDateMDY(stringDate, '/')).set({ h, m }).format() },
    'tt-RU': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'pa-IN': { stringISODate: () => moment(getDateDMY(stringDate, '-')).set({ h, m }).format() },
    'gu-IN': { stringISODate: () => moment(getDateDMY(stringDate, '-')).set({ h, m }).format() },
    'ta-IN': { stringISODate: () => moment(getDateDMY(stringDate, '-')).set({ h, m }).format() },
    'te-IN': { stringISODate: () => moment(getDateDMY(stringDate, '-')).set({ h, m }).format() },
    'kn-IN': { stringISODate: () => moment(getDateDMY(stringDate, '-')).set({ h, m }).format() },
    'mr-IN': { stringISODate: () => moment(getDateDMY(stringDate, '-')).set({ h, m }).format() },
    'sa-IN': { stringISODate: () => moment(getDateDMY(stringDate, '-')).set({ h, m }).format() },
    'mn-MN': { stringISODate: () => moment(getDateYMD(stringDate, '.')).set({ h, m }).format() },
    'gl-ES': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'kok-IN': { stringISODate: () => moment(getDateDMY(stringDate, '-')).set({ h, m }).format() },
    'syr-SY': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'dv-MV': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'ar-IQ': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'zh-CN': { stringISODate: () => moment(getDateYMD(stringDate, '/')).set({ h, m }).format() },
    'de-CH': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'en-GB': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'es-MX': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'fr-BE': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'it-CH': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'nl-BE': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'nn-NO': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'pt-PT': { stringISODate: () => moment(getDateDMY(stringDate, '-')).set({ h, m }).format() },
    'sr-Latn-CS': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'sv-FI': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'az-Cyrl-AZ': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'ms-BN': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'uz-Cyrl-UZ': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'ar-EG': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'zh-HK': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'de-AT': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'en-AU': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'es-ES': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'fr-CA': { stringISODate: () => moment(getDateYMD(stringDate, '-')).set({ h, m }).format() },
    'sr-Cyrl-CS': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'ar-LY': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'zh-SG': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'de-LU': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'en-CA': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'es-GT': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'fr-CH': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'ar-DZ': { stringISODate: () => moment(getDateDMY(stringDate, '-')).set({ h, m }).format() },
    'zh-MO': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'de-LI': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'en-NZ': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'es-CR': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'fr-LU': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'ar-MA': { stringISODate: () => moment(getDateDMY(stringDate, '-')).set({ h, m }).format() },
    'en-IE': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'es-PA': { stringISODate: () => moment(getDateMDY(stringDate, '/')).set({ h, m }).format() },
    'fr-MC': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'ar-TN': { stringISODate: () => moment(getDateDMY(stringDate, '-')).set({ h, m }).format() },
    'en-ZA': { stringISODate: () => moment(getDateYMD(stringDate, '/')).set({ h, m }).format() },
    'es-DO': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'ar-OM': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'en-JM': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'es-VE': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'ar-YE': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'en-029': { stringISODate: () => moment(getDateMDY(stringDate, '/')).set({ h, m }).format() },
    'es-CO': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'ar-SY': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'en-BZ': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'es-PE': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'ar-JO': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'en-TT': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'es-AR': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'ar-LB': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'en-ZW': { stringISODate: () => moment(getDateMDY(stringDate, '/')).set({ h, m }).format() },
    'es-EC': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'ar-KW': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'en-PH': { stringISODate: () => moment(getDateMDY(stringDate, '/')).set({ h, m }).format() },
    'es-CL': { stringISODate: () => moment(getDateDMY(stringDate, '-')).set({ h, m }).format() },
    'ar-AE': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'es-UY': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'ar-BH': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'es-PY': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'ar-QA': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'es-BO': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'es-SV': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'es-HN': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'es-NI': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'es-PR': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'am-ET': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'tzm-Latn-DZ': { stringISODate: () => moment(getDateDMY(stringDate, '-')).set({ h, m }).format() },
    'iu-Latn-CA': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'sma-NO': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'mn-Mong-CN': { stringISODate: () => moment(getDateYMD(stringDate, '/')).set({ h, m }).format() },
    'gd-GB': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'en-MY': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'prs-AF': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'bn-BD': { stringISODate: () => moment(getDateDMY(stringDate, '-')).set({ h, m }).format() },
    'wo-SN': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'rw-RW': { stringISODate: () => moment(getDateMDY(stringDate, '/')).set({ h, m }).format() },
    'qut-GT': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'sah-RU': { stringISODate: () => moment(getDateMDY(stringDate, '.')).set({ h, m }).format() },
    'gsw-FR': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'co-FR': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'oc-FR': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'mi-NZ': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'ga-IE': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'se-SE': { stringISODate: () => moment(getDateYMD(stringDate, '-')).set({ h, m }).format() },
    'br-FR': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'smn-FI': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'moh-CA': { stringISODate: () => moment(getDateMDY(stringDate, '/')).set({ h, m }).format() },
    'arn-CL': { stringISODate: () => moment(getDateDMY(stringDate, '-')).set({ h, m }).format() },
    'ii-CN': { stringISODate: () => moment(getDateYMD(stringDate, '/')).set({ h, m }).format() },
    'dsb-DE': { stringISODate: () => moment(getDateDMY(stringDate, '. ')).set({ h, m }).format() },
    'ig-NG': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'kl-GL': { stringISODate: () => moment(getDateDMY(stringDate, '-')).set({ h, m }).format() },
    'lb-LU': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'ba-RU': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'nso-ZA': { stringISODate: () => moment(getDateYMD(stringDate, '/')).set({ h, m }).format() },
    'quz-BO': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'yo-NG': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'ha-Latn-NG': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'fil-PH': { stringISODate: () => moment(getDateMDY(stringDate, '/')).set({ h, m }).format() },
    'ps-AF': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'fy-NL': { stringISODate: () => moment(getDateDMY(stringDate, '-')).set({ h, m }).format() },
    'ne-NP': { stringISODate: () => moment(getDateMDY(stringDate, '/')).set({ h, m }).format() },
    'se-NO': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'iu-Cans-CA': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'sr-Latn-RS': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'si-LK': { stringISODate: () => moment(getDateYMD(stringDate, '-')).set({ h, m }).format() },
    'sr-Cyrl-RS': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'lo-LA': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'km-KH': { stringISODate: () => moment(getDateYMD(stringDate, '-')).set({ h, m }).format() },
    'cy-GB': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'bo-CN': { stringISODate: () => moment(getDateYMD(stringDate, '/')).set({ h, m }).format() },
    'sms-FI': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'as-IN': { stringISODate: () => moment(getDateDMY(stringDate, '-')).set({ h, m }).format() },
    'ml-IN': { stringISODate: () => moment(getDateDMY(stringDate, '-')).set({ h, m }).format() },
    'en-IN': { stringISODate: () => moment(getDateDMY(stringDate, '-')).set({ h, m }).format() },
    'or-IN': { stringISODate: () => moment(getDateDMY(stringDate, '-')).set({ h, m }).format() },
    'bn-IN': { stringISODate: () => moment(getDateDMY(stringDate, '-')).set({ h, m }).format() },
    'tk-TM': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'bs-Latn-BA': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'mt-MT': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'sr-Cyrl-ME': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'se-FI': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'zu-ZA': { stringISODate: () => moment(getDateYMD(stringDate, '/')).set({ h, m }).format() },
    'xh-ZA': { stringISODate: () => moment(getDateYMD(stringDate, '/')).set({ h, m }).format() },
    'tn-ZA': { stringISODate: () => moment(getDateYMD(stringDate, '/')).set({ h, m }).format() },
    'hsb-DE': { stringISODate: () => moment(getDateDMY(stringDate, '. ')).set({ h, m }).format() },
    'bs-Cyrl-BA': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'tg-Cyrl-TJ': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'sr-Latn-BA': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'smj-NO': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'rm-CH': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'smj-SE': { stringISODate: () => moment(getDateYMD(stringDate, '-')).set({ h, m }).format() },
    'quz-EC': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'quz-PE': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'hr-BA': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'sr-Latn-ME': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'sma-SE': { stringISODate: () => moment(getDateYMD(stringDate, '-')).set({ h, m }).format() },
    'en-SG': { stringISODate: () => moment(getDateDMY(stringDate, '/')).set({ h, m }).format() },
    'ug-CN': { stringISODate: () => moment(getDateYMD(stringDate, '-')).set({ h, m }).format() },
    'sr-Cyrl-BA': { stringISODate: () => moment(getDateDMY(stringDate, '.')).set({ h, m }).format() },
    'es-US': { stringISODate: () => moment(getDateMDY(stringDate, '/')).set({ h, m }).format() }
  }
  const result = formats[navigator.language] || formats['en-US']
  return result.stringISODate()
}
