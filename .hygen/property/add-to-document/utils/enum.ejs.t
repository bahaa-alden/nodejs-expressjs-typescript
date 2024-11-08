---
inject: true
to: src/utils/enum.ts
after:  \<creating\-enum\-type \/\>
---
<% if (kind === 'enum' && isEnumDefined === 'no') { -%>
export enum <%= enumType %> {
  <%= enumValue %> = '<%= enumValue %>'
}
<% } -%>