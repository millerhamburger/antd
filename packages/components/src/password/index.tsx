/*
 * @Author: 叶毅 yeyi@brandnewdata.com
 * @Date: 2024-02-23 13:42:48
 * @LastEditors: 叶毅 yeyi@brandnewdata.com
 * @LastEditTime: 2024-02-23 15:02:55
 * @FilePath: /antd/packages/components/src/password/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { connect, mapProps, mapReadPretty } from '@formily/react'
import { Input } from 'antd'
import { PasswordProps } from 'antd/lib/input'
import React from 'react'
import { PreviewText } from '../preview-text'
import { PasswordStrength } from './PasswordStrength'

export interface IPasswordProps extends PasswordProps {
  checkStrength: boolean
}

export const Password = connect(
  (props: IPasswordProps) => {
    const { value, className, checkStrength, ...others } = props
    const blockStyle: React.CSSProperties = {
      position: 'absolute',
      zIndex: 1,
      height: 8,
      top: 0,
      background: '#fff',
      width: 1,
      transform: 'translate(-50%, 0)',
    }
    return (
      <span className={className}>
        <Input.Password {...others} value={value} />
        {checkStrength && (
          <PasswordStrength value={String(value)}>
            {(score) => {
              return (
                <div
                  style={{
                    background: '#e0e0e0',
                    marginBottom: 3,
                    position: 'relative',
                  }}
                >
                  <div style={{ ...blockStyle, left: '20%' }} />
                  <div style={{ ...blockStyle, left: '40%' }} />
                  <div style={{ ...blockStyle, left: '60%' }} />
                  <div style={{ ...blockStyle, left: '80%' }} />
                  <div
                    style={{
                      position: 'relative',
                      backgroundImage:
                        '-webkit-linear-gradient(left, #ff5500, #ff9300)',
                      transition: 'all 0.35s ease-in-out',
                      height: 8,
                      width: '100%',
                      marginTop: 5,
                      clipPath: `polygon(0 0,${score}% 0,${score}% 100%,0 100%)`,
                    }}
                  />
                </div>
              )
            }}
          </PasswordStrength>
        )}
      </span>
    )
  },
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

export default Password
