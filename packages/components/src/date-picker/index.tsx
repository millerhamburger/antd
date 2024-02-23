/*
 * @Author: 叶毅 yeyi@brandnewdata.com
 * @Date: 2024-02-23 13:42:48
 * @LastEditors: 叶毅 yeyi@brandnewdata.com
 * @LastEditTime: 2024-02-23 14:47:26
 * @FilePath: /antd/packages/components/src/date-picker/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { DatePicker as AntdDatePicker } from 'antd'
import { DatePickerProps as AntdDatePickerProps } from 'antd/es/date-picker'
import dayjs from 'dayjs'
import { PreviewText } from '../preview-text'
import { dayjsable, formatDayjsValue } from '../__builtins__'

type DatePickerProps<PickerProps> = Exclude<
  PickerProps,
  'value' | 'onChange'
> & {
  value: string
  onChange: (value: string | string[]) => void
}

const mapDateFormat = function () {
  const getDefaultFormat = (props: DatePickerProps<AntdDatePickerProps>) => {
    if (props['picker'] === 'month') {
      return 'YYYY-MM'
    } else if (props['picker'] === 'quarter') {
      return 'YYYY-\\QQ'
    } else if (props['picker'] === 'year') {
      return 'YYYY'
    } else if (props['picker'] === 'week') {
      return 'gggg-wo'
    }
    return props['showTime'] ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'
  }
  return (props: any, field: any) => {
    const format = props['format'] || getDefaultFormat(props)
    const onChange = props.onChange

    const customProperty: any = {}

    if (props.disabled || field.disabled) {
      customProperty.placeholder = ''
    }

    return {
      ...props,
      format: format,
      value: dayjsable(props.value, format === 'gggg-wo' ? 'gggg-ww' : format),
      onChange: (value: dayjs.Dayjs | dayjs.Dayjs[]) => {
        if (onChange) {
          onChange(formatDayjsValue(value, format))
        }
      },
      ...customProperty,
    }
  }
}

const InternalDatePicker = connect(
  AntdDatePicker,
  mapProps(mapDateFormat()),
  mapReadPretty(PreviewText.DatePicker)
)
const RangePicker = connect(
  AntdDatePicker.RangePicker,
  mapProps(mapDateFormat()),
  mapReadPretty(PreviewText.DateRangePicker)
)
export const DatePicker = Object.assign(InternalDatePicker, {
  RangePicker,
})

export default DatePicker
