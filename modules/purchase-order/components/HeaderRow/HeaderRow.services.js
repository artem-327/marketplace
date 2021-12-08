// Services
import { getSafe } from '~/utils/functions'
import Logo from '~/assets/images/nav/logo-echo.svg'

/**
 * @param {object} props - {hasLogo, useCompanyLogo, getCompanyLogo, companyId}
 * @return none
 */
export const loadCompanyLogo = async props => {
  if (
    props.hasLogo &&
    getSafe(() => props.useCompanyLogo.value, 'false').toLowerCase() === 'true'
    && props.getCompanyLogo
  ) {
    await props.getCompanyLogo(props.companyId)
  }
}
/**
 * @param {object} props - {companyLogo}
 * @return {object} - Logo
 */
export const returnCompanyLogo = props => {
  if (props.companyLogo) {
    const file = new Blob([props.companyLogo], { type: props.companyLogo.type })
    return URL.createObjectURL(file)
  }
  return props.companyLogoLoading ? null : Logo
}
