import type { ComponentProps, ForwardRefRenderFunction } from 'react';

import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

import { useField, useIsSubmitting } from './ActionContextProvider';

interface GetClassNameProps {
  className: string | undefined;
  disabled: boolean | undefined;
  transparent?: boolean;
  errors?: string[];
}

function getClassName(props: GetClassNameProps) {
  const { disabled, className, transparent, errors } = props;

  return twMerge(
    'border-none outline-none bg-copy/[.05] transition-all duration-150',
    'rounded-lg py-3 px-4 font-normal text-copy text-sm',
    transparent && 'bg-transparent focus:ring-0',
    disabled && 'cursor-not-allowed bg-white/10',
    errors?.length && 'border-2 border-red-600',
    className,
  );
}

type SelectProps = ComponentProps<'select'> &
  ScaffoldProps & {
    innerClassName?: string;
    options: { value: string; label: string }[];
  };

const SelectField: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  props,
  ref,
) => {
  const {
    transparent,
    labelProps,
    name,
    label,
    className,
    innerClassName,
    value: suppliedValue,
    disabled: initDisabled,
    options,
    ...restOfProps
  } = props;

  const { value, errors } = useField(name);
  const isSubmitting = useIsSubmitting();
  const disabled = isSubmitting || initDisabled;

  const defaultValue = suppliedValue
    ? undefined
    : typeof value === 'string'
      ? value
      : undefined;

  return (
    <Scaffold
      name={name}
      label={label}
      errors={errors}
      className={className}
      labelProps={labelProps}
      transparent={transparent}
    >
      <select
        ref={ref}
        name={name}
        disabled={disabled}
        defaultValue={defaultValue}
        value={suppliedValue}
        aria-invalid={!!errors?.length}
        aria-describedby={`${name}-error`}
        className={getClassName({
          className: innerClassName,
          disabled,
          transparent,
          errors,
        })}
        {...restOfProps}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Scaffold>
  );
};

export const FormSelectField = forwardRef(SelectField);

interface ScaffoldProps {
  name: string;
  label?: string | undefined;
  labelProps?: ComponentProps<'span'>;
  transparent?: boolean;
}

function Scaffold(
  props: ComponentProps<'div'> &
    ScaffoldProps & { errors?: string[] | undefined },
) {
  const { name, children, className, label, labelProps, errors, ...rest } =
    props;
  return (
    <div
      className={twMerge(
        'flex flex-col items-stretch justify-center gap-1',
        className,
      )}
      {...rest}
    >
      {label ? <FormLabel {...labelProps}>{label}</FormLabel> : null}
      {children}
      {errors?.length ? <InputError name={name} errors={errors} /> : null}
    </div>
  );
}

export function InputError(props: {
  name: string | undefined;
  errors: string[];
}) {
  const { name, errors } = props;
  return (
    <span className="text-sm font-semibold text-red-500" id={`${name}-error`}>
      {errors.join(', ')}
    </span>
  );
}

export function FormLabel(props: ComponentProps<'span'>) {
  const { children, className, ...rest } = props;
  return (
    <span
      className={twMerge('text-sm font-light text-copy/60', className)}
      {...rest}
    >
      {children}
    </span>
  );
}
