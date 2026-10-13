import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { COMPANY, CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Imprint | Millibar Nitrox",
  description: "Legal notice (Impressum) for Millibar Nitrox under § 5 DDG.",
  alternates: { canonical: "/imprint" },
};

export default function ImprintPage() {
  return (
    <LegalPage
      eyebrow="Imprint"
      title="Imprint (Impressum)"
      intro="A legal notice required by German law."
    >
      <p>
        This legal notice complies with § 5 DDG (formerly TMG). It applies to
        Millibar Nitrox at ean.millibar.io.
      </p>

      <h2>Service provider</h2>
      <p>
        <strong>{COMPANY.name}</strong>
        <br />
        {COMPANY.careOf}
        <br />
        {COMPANY.street}
        <br />
        {COMPANY.city}
      </p>
      <p>
        <strong>Register:</strong> {COMPANY.register}
        <br />
        <strong>Register ID:</strong> {COMPANY.registerId}
        <br />
        <strong>DUNS:</strong> {COMPANY.duns}
        <br />
        <strong>Represented by (managing director):</strong> {COMPANY.representedBy}
      </p>
      <p>
        <strong>Website:</strong> <a href={COMPANY.website}>millibar.io</a>
        <br />
        <strong>Email:</strong> <a href={`mailto:${CONTACT.general}`}>{CONTACT.general}</a>
      </p>

      <h2>Liability for content</h2>
      <p>
        The contents of this website have been created with the greatest
        possible care. However, we cannot guarantee their accuracy,
        completeness or topicality. As a service provider we are responsible
        for our own content on these pages under general law (§ 7 (1) DDG).
        Under §§ 8 to 10 DDG we are not obliged to monitor transmitted or
        stored third-party information or to investigate circumstances that
        indicate illegal activity. Obligations to remove or block information
        under general law remain unaffected; liability in this respect is only
        possible from the moment we become aware of a specific infringement.
        Upon notification of such violations, we will remove the content
        immediately.
      </p>

      <h2>Liability for links</h2>
      <p>
        This website contains links to external websites over whose content we
        have no control, so we cannot accept liability for that content. The
        respective provider or operator of the linked pages is always
        responsible for their content. Upon notification of violations, we
        will remove such links immediately.
      </p>

      <h2>Copyright</h2>
      <p>
        The content and works created by the site operator on these pages are
        subject to German copyright law. Duplication, processing, distribution
        and any kind of use outside the limits of copyright require the written
        consent of the respective author or creator.
      </p>
    </LegalPage>
  );
}
