/**
 * Settings Model
 *
 * Matches the output of Mapper.gs → mapSettingsObject(rows).
 * Backend endpoint: ?action=getSettings
 *
 * The backend reads key-value pairs from the Settings sheet and
 * coerces them via coerceSettingValue() based on SETTING_TYPES.
 *
 * Known fields are defined explicitly for type safety.
 * New settings added to the sheet require adding a property here.
 */

export interface Settings {
  readonly companyName: string;
  readonly companyTagline: string;
  readonly heroTitle: string;
  readonly heroSubtitle: string;
  readonly heroCtaText: string;
  readonly whatsappNumber: string;
  readonly supportEmail: string;
  readonly supportPhone: string;
  readonly address: string;
  readonly mapLink: string;
  readonly logoUrl: string;
  readonly primaryColor: string;
}
