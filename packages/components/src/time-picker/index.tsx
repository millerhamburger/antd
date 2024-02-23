/*
 * @Author: 叶毅 yeyi@brandnewdata.com
 * @Date: 2024-02-23 13:42:48
 * @LastEditors: 叶毅 yeyi@brandnewdata.com
 * @LastEditTime: 2024-02-23 15:04:57
 * @FilePath: /antd/packages/components/src/time-picker/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { connect, mapProps, mapReadPretty } from '@formily/react'
import {
  TimePicker as AntdTimePicker,
  TimePickerProps as AntdTimePickerProps,
  TimeRangePickerProps,
} from 'antd'
import dayjs from 'dayjs'
import { PreviewText } from '../preview-text'
import { dayjsable, formatDayjsValue } from '../__builtins__'

type ComposedTimePicker = React.FC<
  React.PropsWithChildren<AntdTimePickerProps>
> & {
  RangePicker?: React.FC<React.PropsWithChildren<TimeRangePickerProps>>
}

const mapTimeFormat = function () {
  return (props: any, field: any) => {
    const format = props['format'] || 'HH:mm:ss'
    const onChange = props.onChange

    const customProperty: any = {}

    if (props.disabled || field.disabled) {
      customProperty.placeholder = ''
    }
    return {
      ...props,
      format,
      value: dayjsable(props.value, format),
      onChange: (value: dayjs.Dayjs | dayjs.Dayjs[]) => {
        if (onChange) {
          onChange(formatDayjsValue(value, format))
        }
      },
      ...customProperty,
    }
  }
}

const InternalTimePicker: ComposedTimePicker = connect(
  AntdTimePicker,
  mapProps(mapTimeFormat()),
  mapReadPretty(PreviewText.TimePicker)
)

const RangePicker = connect(
  AntdTimePicker.RangePicker,
  mapProps(mapTimeFormat()),
  mapReadPretty(PreviewText.TimeRangePicker)
)

export const TimePicker = Object.assign(InternalTimePicker, { RangePicker })

export default TimePicker
