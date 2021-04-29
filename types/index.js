/**
 * @category CompanyRequest
 * @description Object CompanyRequest with types
 * @typedef TCompanyRequest
 * @property {Array<number> | []} [associations]
 * @property {number} [businessType]
 * @property {string} [cin]
 * @property {string} [dba]
 * @property {string} [dunsNumber]
 * @property {boolean} [enabled]
 * @property {Array<string>} [industryType]
 * @property {number} [naicsCode]
 * @property {string} name
 * @property {string} [phone]
 * @property {string} [socialFacebook]
 * @property {string} [socialInstagram]
 * @property {string} [socialLinkedin]
 * @property {string} [socialTwitter]
 * @property {string} [tagline]
 * @property {string} [tin]
 * @property {Array<'ein' | 'ssn'>} tinType
 * @property {Array<"REGULAR" | "BROKER"> } [type]
 * @property {string} [website]
 *
 */

/**
 * @category CompanyObject from CompanyResponse from BE or from form where associations and businessType are primitive number not objects
 * @description Object Company with types
 * @typedef TCompanyObject
 * @property {Array<Object<string, any> | number>} [associations]
 * @property {Object<string, any> | number} [businessType]
 * @property {string} [cin]
 * @property {string} [dba]
 * @property {string} [dunsNumber]
 * @property {boolean} [enabled]
 * @property {Array<string>} [industryType]
 * @property {number} [naicsCode]
 * @property {string} name
 * @property {string} [phone]
 * @property {string} [socialFacebook]
 * @property {string} [socialInstagram]
 * @property {string} [socialLinkedin]
 * @property {string} [socialTwitter]
 * @property {string} [tagline]
 * @property {string} [tin]
 * @property {Array<'ein' | 'ssn'>} tinType
 * @property {Array<"REGULAR" | "BROKER"> } [type]
 * @property {string} [website]
 *
 */
let T
export default T
