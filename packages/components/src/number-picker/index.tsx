import { connect, mapProps, mapReadPretty } from '@formily/react'
import { InputNumber } from 'antd'
import { PreviewText } from '../preview-text'

export const NumberPicker = connect(
  InputNumber,
  mapProps((props, field) => {
    let placeholder = props.placeholder || '请输入'

    if (field?.disabled || props.disabled) {
      placeholder = ''
    }
    return {
      ...props,
      placeholder,
    }
  }),
  mapReadPretty(PreviewText.NumberPicker)
)

export default NumberPicker
