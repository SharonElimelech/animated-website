/** Central place for the firm's real contact details (from the live site). */
export const SITE = {
  name: "הדר אלימלך",
  nameEn: "HADAR ELIMELECH",
  tagline: "LAW FIRM & NOTARY",
  phone: "052-4925422",
  phoneIntl: "972524925422", // for tel:/wa.me links
  address: "כוכב השחר 3, אשדוד",
  // TODO: replace with the firm's real profile URLs
  social: {
    facebook: "#",
    instagram: "#",
  },
} as const;

export const whatsappLink = (text?: string) =>
  `https://wa.me/${SITE.phoneIntl}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const telLink = `tel:+${SITE.phoneIntl}`;

export const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(
  SITE.address,
)}&hl=he&z=15&output=embed`;
