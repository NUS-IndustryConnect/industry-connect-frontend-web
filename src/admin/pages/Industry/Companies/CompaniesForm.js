import React from 'react';

import Form from '../../../../common/Form';

export const COMPANY_TIERS = [
  { value: "gold", label: "Gold" },
  { value: "silver", label: "Silver" }
];

export const getCompanyTierDisplay = companyTier => COMPANY_TIERS
  .find(elem => elem.value === companyTier).label;

export const getCompanyFields = data => ({
  companyName: data.get('companyName'),
  companyTier: data.get('companyTier'),
  companyDescription: data.get('companyDescription'),
});

export default function CompaniesForm({ submit, initial, resettable }) {
  return (
    <Form
      fields={[
        { type: "text", name: "companyName", label: "Company Name", initial: initial?.companyName },
        { type: "dropdown", name: "companyTier", label: "Tier", options: COMPANY_TIERS, initial: initial?.companyTier },
        { type: "long-text", name: "companyDescription", label: "Company Description", initial: initial?.companyDescription },
      ]}
      submit={submit}
      submitLabel={initial ? "Update" : "Create"}
      resettable={resettable}
    />
  )
}
