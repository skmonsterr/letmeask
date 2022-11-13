import { ButtonHTMLAttributes } from 'react'
import '../Button/styles.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function Button({ isOutlined = false, ...props }: ButtonProps) {
  return (
    <div>
      <button className={`button ${isOutlined ? 'outlined' : ''}`}
        {...props}
      />
    </div>
  )
}