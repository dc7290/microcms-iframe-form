export const formDefaultValues = {
  name: {
    title: 'お名前',
    placeholder: '田中太郎',
    description: 'フルネームで入力ください。',
    isRequired: false,
  },
  email: {
    title: 'メールアドレス',
    placeholder: 'xxx@xxx.com',
    description: 'yyy@yyy.comをフィルタリング設定から除外してください。',
    isRequired: false,
  },
  tel: {
    title: '電話番号',
    placeholder: '09012345678,090-1234-5678',
    description: '',
    isRequired: false,
  },
  organization: {
    title: '会社名',
    placeholder: '株式会社サンプルコーポレーション',
    description: '',
    isRequired: false,
  },
  'address-of-one-line': {
    title: '住所（一行）',
    placeholder: '東京都〇〇〇',
    description: '',
    isRequired: false,
  },
  'text-field': {
    title: 'カスタム一行テキスト',
    placeholder: '',
    description: '',
    isRequired: false,
  },
  // 'text-area': {
  //   title: 'テキストエリア',
  //   placeholder: '',
  //   description: '',
  //   isRequired: false,
  // },
}

export type FormKind = keyof typeof formDefaultValues

type CommonField<T extends FormKind> = {
  kind: T
  fieldId: string
} & typeof formDefaultValues[T]

type Name = CommonField<'name'>
type Email = CommonField<'email'>
type Tel = CommonField<'tel'>
type Organization = CommonField<'organization'>
type AddressOfOneLine = CommonField<'address-of-one-line'>
type TextField = CommonField<'text-field'>

// type TextArea = CommonField<'text-area'>

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

export type Form = (Name | Email | Tel | Organization | AddressOfOneLine | TextField)[]

export type FormValuesType = {
  form: Form
}
