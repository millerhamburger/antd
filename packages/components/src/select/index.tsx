/*
 * @Author: 叶毅 yeyi@brandnewdata.com
 * @Date: 2024-02-23 13:42:48
 * @LastEditors: 叶毅 yeyi@brandnewdata.com
 * @LastEditTime: 2024-02-23 14:50:05
 * @FilePath: /antd/packages/components/src/select/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { LoadingOutlined } from '@ant-design/icons'
import { connect, mapProps, mapReadPretty, ReactFC } from '@formily/react'
import { Select as AntdSelect } from 'antd'
import { SelectProps } from 'antd/lib/select'
import React from 'react'
import { PreviewText } from '../preview-text'

export const Select: ReactFC<SelectProps<any, any>> = connect(
  AntdSelect,
  mapProps(
    {
      dataSource: 'options',
      loading: true,
    },
    (props, field) => {
      let placeholder = props.placeholder || '请选择'

      if (field?.disabled || props.disabled) {
        placeholder = ''
      }
      return {
        ...props,
        suffixIcon:
          field?.['loading'] || field?.['validating'] ? (
            <LoadingOutlined />
          ) : (
            props.suffixIcon
          ),
        placeholder,
      }
    }
  ),
  mapReadPretty(PreviewText.Select)
)

export default Select
