export interface InputProps {
  label: string;
  input: {
    id: string;
    type: string;
    min?: string | number;
    max?: string | number;
    step?: string | number;
    defaultValue?: string | number;
  };
}
