import styled from '@emotion/styled';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import * as React from 'react';

interface CheckboxProps extends Omit<React.ComponentPropsWithoutRef<'button'>, 'defaultChecked'> {
  checked?: boolean;
  id?: string;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>((props, forwardedRef) => {
  const { checked = false, disabled, onCheckedChange, className, id, ...checkboxProps } = props;

  return (
    <CheckboxRoot
      type="button"
      role="checkbox"
      aria-checked={checked}
      data-state={checked ? 'checked' : 'unchecked'}
      data-disabled={disabled ? '' : undefined}
      disabled={disabled}
      id={id}
      ref={forwardedRef}
      onClick={() => onCheckedChange?.(!checked)}
      className={className}
      {...checkboxProps}
    >
      <motion.div
        initial={false}
        animate={{
          backgroundColor: checked ? '#00c471' : 'white',
          borderColor: checked ? '#00c471' : '#e5e5e5',
        }}
        transition={{ duration: 0.2 }}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '2px',
          borderWidth: '1px',
          borderStyle: 'solid',
        }}
      >
        {checked && (
          <CheckboxIndicator
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Check className="h-4 w-4" />
          </CheckboxIndicator>
        )}
      </motion.div>
    </CheckboxRoot>
  );
});

const CheckboxRoot = styled.button`
  width: 16px;
  height: 16px;
  border-radius: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  overflow: hidden;
  background: none;
  border: none;

  &:hover {
    div {
      background-color: ${props => (props['aria-checked'] ? '#00b367' : '#f5f5f5')};
    }
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:focus-visible {
    outline: none;
    ring: 2px;
    ring-offset: 2px;
  }
`;

const CheckboxIndicator = styled(motion.span)`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  width: 100%;
  height: 100%;
`;

Checkbox.displayName = 'Checkbox';

export { Checkbox };
export type { CheckboxProps };
