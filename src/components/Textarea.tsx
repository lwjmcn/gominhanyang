import styles from './textarea.module.css';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  wrapperstyles?: React.CSSProperties;
  type: 'letter' | 'reply';
  children?: React.ReactNode;
}
export const Textarea = (props: TextareaProps) => {
  return (
    <div
      className={styles.wrapper}
      style={
        {
          '--color-background': `${props.type === 'letter' ? '#fbf39d' : '#FEE1DC'}`,
          '--color-border': `${props.type === 'letter' ? '#f7eb6c' : '#FBC6BC'}`,
          ...(props.wrapperstyles || {}),
        } as React.CSSProperties
      }
    >
      <textarea className={styles.letterInput} {...props} />
      {props.children}
    </div>
  );
};
