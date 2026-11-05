/** Central place for the firm's real contact details (from the live site). */
export const SITE = {
  name: "הדר אלימלך",
  url: "https://hadar-elimelech-law.co.il",
  nameEn: "HADAR ELIMELECH",
  tagline: "LAW FIRM & NOTARY",
  phone: "052-4925422",
  phoneIntl: "972524925422", // for tel:/wa.me links
  address: "האורגים 11, אשדוד",
  // TODO: Facebook URL still missing ("#" = not shown in structured data)
  social: {
    facebook: "#",
    instagram: "https://www.instagram.com/hadar_elimelech_adv/",
    tiktok: "https://www.tiktok.com/@hadarelimelechlaw",
  },
} as const;

export const whatsappLink = (text?: string) =>
  `https://wa.me/${SITE.phoneIntl}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const telLink = `tel:+${SITE.phoneIntl}`;

export const mapsEmbed = `https://maps.google.com/maps?q=${encodeURIComponent(
  SITE.address,
)}&hl=he&z=15&output=embed`;
