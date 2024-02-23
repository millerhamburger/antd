/*
 * @Author: 叶毅 yeyi@brandnewdata.com
 * @Date: 2024-02-23 13:42:48
 * @LastEditors: 叶毅 yeyi@brandnewdata.com
 * @LastEditTime: 2024-02-23 14:39:41
 * @FilePath: /antd/packages/components/src/input/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { LoadingOutlined } from '@ant-design/icons'
import { connect, mapProps, mapReadPretty, ReactFC } from '@formily/react'
import { Input as AntdInput } from 'antd'
import type { InputProps } from 'antd/es/input'
import React from 'react'
import { PreviewText } from '../preview-text'

const InternalInput: ReactFC<InputProps> = connect(
  AntdInput,
  mapProps((props, field) => {
    let placeholder = props.placeholder || '请输入'

    if (field?.disabled || props.disabled) {
      placeholder = ''
    }

    return {
      ...props,
      suffix: (
        <span>
          {field?.['loading'] || field?.['validating'] ? (
            <LoadingOutlined />
          ) : (
            props.suffix
          )}
        </span>
      ),
      placeholder,
    }
  }),
  mapReadPretty(PreviewText.Input)
)
const TextArea = connect(
  AntdInput.TextArea,
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
  mapReadPretty(PreviewText.Input)
)

export const Input = Object.assign(InternalInput, {
  TextArea,
})

export default Input
