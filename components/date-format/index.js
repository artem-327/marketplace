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
    ar: 'DD/MM/YY',
    bg: 'DD.M.YYYY',
    ca: 'DD/MM/YYYY',
    zh: 'YYYY/M/D',
    cs: 'D. M. YYYY',
    da: 'DD-MM-YYYY',
    de: 'DD.MM.YYYY',
    el: 'D/M/YYYY',
    en: 'MM/DD/YYYY',
    fi: 'D.M.YYYY',
    fr: 'DD/MM/YYYY',
    he: 'DD/MM/YYYY',
    hu: 'YYYY. MM. DD.',
    is: 'D.M.YYYY',
    it: 'DD/MM/YYYY',
    ja: 'YYYY/MM/DD',
    ko: 'YYYY-MM-DD',
    nl: 'D-M-YYYY',
    nb: 'DD.MM.YYYY',
    pl: 'YYYY-MM-DD',
    pt: 'D/M/YYYY',
    ro: 'DD.MM.YYYY',
    ru: 'DD.MM.YYYY',
    hr: 'D.M.YYYY',
    sk: 'D. M. YYYY',
    sq: 'YYYY-MM-DD',
    sv: 'YYYY-MM-DD',
    th: 'D/M/YYYY',
    tr: 'DD.MM.YYYY',
    ur: 'DD/MM/YYYY',
    id: 'DD/MM/YYYY',
    uk: 'DD.MM.YYYY',
    be: 'DD.MM.YYYY',
    sl: 'D.M.YYYY',
    et: 'D.MM.YYYY',
    lv: 'YYYY.MM.DD.',
    lt: 'YYYY.MM.DD',
    fa: 'MM/DD/YYYY',
    vi: 'DD/MM/YYYY',
    hy: 'DD.MM.YYYY',
    eu: 'YYYY/MM/DD',
    mk: 'DD.MM.YYYY',
    af: 'YYYY/MM/DD',
    ka: 'DD.MM.YYYY',
    fo: 'DD-MM-YYYY',
    hi: 'DD-MM-YYYY',
    ms: 'DD/MM/YYYY',
    kk: 'DD.MM.YYYY',
    ky: 'DD.MM.YY',
    sw: 'M/D/YYYY',
    tt: 'DD.MM.YYYY',
    pa: 'DD-MM-YY',
    gu: 'DD-MM-YY',
    ta: 'DD-MM-YYYY',
    te: 'DD-MM-YY',
    kn: 'DD-MM-YY',
    mr: 'DD-MM-YYYY',
    sa: 'DD-MM-YYYY',
    mn: 'YY.MM.DD',
    gl: 'DD/MM/YY',
    kok: 'DD-MM-YYYY',
    syr: 'DD/MM/YYYY',
    dv: 'DD/MM/YY',
    es: 'DD/MM/YYYY',
    nn: 'DD.MM.YYYY',
    az: 'DD.MM.YYYY',
    uz: 'DD.MM.YYYY',
    am: 'D/M/YYYY',
    tzm: 'DD-MM-YYYY',
    iu: 'D/MM/YYYY',
    sma: 'DD.MM.YYYY',
    gd: 'DD/MM/YYYY',
    prs: 'DD/MM/YY',
    bn: 'DD-MM-YY',
    wo: 'DD/MM/YYYY',
    rw: 'M/D/YYYY',
    qut: 'DD/MM/YYYY',
    sah: 'MM.DD.YYYY',
    gsw: 'DD/MM/YYYY',
    co: 'DD/MM/YYYY',
    oc: 'DD/MM/YYYY',
    mi: 'DD/MM/YYYY',
    ga: 'DD/MM/YYYY',
    se: 'YYYY-MM-DD',
    br: 'DD/MM/YYYY',
    smn: 'D.M.YYYY',
    moh: 'M/D/YYYY',
    arn: 'DD-MM-YYYY',
    ii: 'YYYY/M/D',
    dsb: 'D. M. YYYY',
    ig: 'D/M/YYYY',
    kl: 'DD-MM-YYYY',
    lb: 'DD/MM/YYYY',
    ba: 'DD.MM.YY',
    nso: 'YYYY/MM/DD',
    quz: 'DD/MM/YYYY',
    yo: 'D/M/YYYY',
    ha: 'D/M/YYYY',
    fil: 'M/D/YYYY',
    ps: 'DD/MM/YY',
    fy: 'D-M-YYYY',
    ne: 'M/D/YYYY',
    si: 'YYYY-MM-DD',
    lo: 'DD/MM/YYYY',
    km: 'YYYY-MM-DD',
    cy: 'DD/MM/YYYY',
    bo: 'YYYY/M/D',
    sms: 'D.M.YYYY',
    as: 'DD-MM-YYYY',
    ml: 'DD-MM-YY',
    or: 'DD-MM-YY',
    tk: 'DD.MM.YY',
    bs: 'D.M.YYYY',
    mt: 'DD/MM/YYYY',
    zu: 'YYYY/MM/DD',
    xh: 'YYYY/MM/DD',
    tn: 'YYYY/MM/DD',
    hsb: 'D. M. YYYY',
    tg: 'DD.MM.YY',
    smj: 'DD.MM.YYYY',
    rm: 'DD/MM/YYYY',
    ug: 'YYYY-M-D',
    sr: 'D.M.YYYY'
  }

  return formats[navigator.language.slice(0, 2)] || 'MM/DD/YYYY'
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
    ar: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    bg: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    ca: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    zh: {
      stringISODate: () =>
        moment(getDateYMD(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    cs: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '. '))
          .set({ h, m })
          .format()
    },
    da: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '-'))
          .set({ h, m })
          .format()
    },
    de: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    el: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    en: {
      stringISODate: () =>
        moment(getDateMDY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    fi: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    fr: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    he: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    hu: {
      stringISODate: () =>
        moment(getDateYMD(stringDate, '. '))
          .set({ h, m })
          .format()
    },
    is: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    it: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    ja: {
      stringISODate: () =>
        moment(getDateYMD(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    ko: {
      stringISODate: () =>
        moment(getDateYMD(stringDate, '-'))
          .set({ h, m })
          .format()
    },
    nl: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '-'))
          .set({ h, m })
          .format()
    },
    nb: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    pl: {
      stringISODate: () =>
        moment(getDateYMD(stringDate, '-'))
          .set({ h, m })
          .format()
    },
    pt: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    ro: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    ru: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    hr: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    sk: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '. '))
          .set({ h, m })
          .format()
    },
    sq: {
      stringISODate: () =>
        moment(getDateYMD(stringDate, '-'))
          .set({ h, m })
          .format()
    },
    sv: {
      stringISODate: () =>
        moment(getDateYMD(stringDate, '-'))
          .set({ h, m })
          .format()
    },
    th: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    tr: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    ur: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    id: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    uk: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    be: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    sl: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    et: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    lv: {
      stringISODate: () =>
        moment(getDateYMD(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    lt: {
      stringISODate: () =>
        moment(getDateYMD(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    fa: {
      stringISODate: () =>
        moment(getDateMDY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    vi: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    hy: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    az: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    eu: {
      stringISODate: () =>
        moment(getDateYMD(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    mk: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    af: {
      stringISODate: () =>
        moment(getDateYMD(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    ka: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    fo: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '-'))
          .set({ h, m })
          .format()
    },
    hi: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '-'))
          .set({ h, m })
          .format()
    },
    ms: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    kk: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    ky: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    sw: {
      stringISODate: () =>
        moment(getDateMDY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    tt: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    pa: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '-'))
          .set({ h, m })
          .format()
    },
    gu: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '-'))
          .set({ h, m })
          .format()
    },
    ta: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '-'))
          .set({ h, m })
          .format()
    },
    te: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '-'))
          .set({ h, m })
          .format()
    },
    kn: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '-'))
          .set({ h, m })
          .format()
    },
    mr: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '-'))
          .set({ h, m })
          .format()
    },
    sa: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '-'))
          .set({ h, m })
          .format()
    },
    mn: {
      stringISODate: () =>
        moment(getDateYMD(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    gl: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    kok: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '-'))
          .set({ h, m })
          .format()
    },
    syr: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    dv: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    es: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    nn: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    sr: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    uz: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    am: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    tzm: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '-'))
          .set({ h, m })
          .format()
    },
    iu: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    sma: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    gd: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    prs: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    bn: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '-'))
          .set({ h, m })
          .format()
    },
    wo: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    rw: {
      stringISODate: () =>
        moment(getDateMDY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    qut: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    sah: {
      stringISODate: () =>
        moment(getDateMDY(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    gsw: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    co: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    oc: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    mi: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    ga: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    se: {
      stringISODate: () =>
        moment(getDateYMD(stringDate, '-'))
          .set({ h, m })
          .format()
    },
    br: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    smn: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    moh: {
      stringISODate: () =>
        moment(getDateMDY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    arn: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '-'))
          .set({ h, m })
          .format()
    },
    ii: {
      stringISODate: () =>
        moment(getDateYMD(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    dsb: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '. '))
          .set({ h, m })
          .format()
    },
    ig: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    kl: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '-'))
          .set({ h, m })
          .format()
    },
    lb: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    ba: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    nso: {
      stringISODate: () =>
        moment(getDateYMD(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    quz: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    yo: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    ha: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    fil: {
      stringISODate: () =>
        moment(getDateMDY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    ps: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    fy: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '-'))
          .set({ h, m })
          .format()
    },
    ne: {
      stringISODate: () =>
        moment(getDateMDY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    si: {
      stringISODate: () =>
        moment(getDateYMD(stringDate, '-'))
          .set({ h, m })
          .format()
    },
    lo: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    km: {
      stringISODate: () =>
        moment(getDateYMD(stringDate, '-'))
          .set({ h, m })
          .format()
    },
    cy: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    bo: {
      stringISODate: () =>
        moment(getDateYMD(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    sms: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    as: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '-'))
          .set({ h, m })
          .format()
    },
    ml: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '-'))
          .set({ h, m })
          .format()
    },
    or: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '-'))
          .set({ h, m })
          .format()
    },
    tk: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    bs: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    mt: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    zu: {
      stringISODate: () =>
        moment(getDateYMD(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    xh: {
      stringISODate: () =>
        moment(getDateYMD(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    tn: {
      stringISODate: () =>
        moment(getDateYMD(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    hsb: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '. '))
          .set({ h, m })
          .format()
    },
    tg: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    smj: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '.'))
          .set({ h, m })
          .format()
    },
    rm: {
      stringISODate: () =>
        moment(getDateDMY(stringDate, '/'))
          .set({ h, m })
          .format()
    },
    ug: {
      stringISODate: () =>
        moment(getDateYMD(stringDate, '-'))
          .set({ h, m })
          .format()
    }
  }
  const result = formats[navigator.language.slice(0, 2)] || formats['en']
  return result.stringISODate()
}
