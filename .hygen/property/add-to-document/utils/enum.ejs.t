---
inject: true
to: src/utils/enum.ts
after:  \<creating\-enum\-type \/\>
---
<% if (kind === 'enum' && isEnumDefined === 'no') { -%>
export enum <%= EnumType %> {
<% enumValue.split(" ").forEach(element => { -%>
  <%= element %> = '<%= element %>',
<% })  -%>
}
<% } -%>