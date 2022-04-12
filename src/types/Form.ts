export const formKinds = {
  'text-field': 'テキストフィールド',
  'text-area': 'テキストエリア',
}

export type FormKind = keyof typeof formKinds

type CommonField<T extends FormKind> = {
  kind: T
  fieldId: string
  title: string
  placeholder?: string
  isRequired: boolean
  description?: string
}

export type TextField = CommonField<'text-field'>

export type TextArea = CommonField<'text-area'>

// type Name = CommonField & {
//   fieldId: 'name'
// }

// type Email = CommonField & {
//   fieldId: 'email'
//   isConfirm: boolean
// }

// type Tel = CommonField & {
//   fieldId: 'tel'
// }

// type Organization = CommonField & {
//   fieldId: 'organization'
// }

// type Address = CommonField & {
//   fieldId: 'address'
// }

// type PostalCodeAndAddress = CommonField & {
//   fieldId: 'postalCodeAndAddress'
//   addressTitle: string
//   addressPlaceholder?: string
//   addressDescription?: string
//   isAutoFill: boolean
// }

// type Item = {
//   fieldId: 'listItem'
//   text: string
// }

// type CheckboxGroup = CommonField & {
//   fieldId: 'checkboxGroup'
//   items: Item[]
// }

// type RadioGroup = CommonField & {
//   fieldId: 'radioGroup'
//   items: Item[]
// }

export type Form = (TextField | TextArea)[]

export type FormValuesType = {
  form: Form
}
