import { SectionHeading, StyledMenuItem, StyledSelect } from "../settings/settings.styled.tsx";
import { SelectChangeEvent } from "@mui/material";

export interface ItemSelectorProps<T extends { id: string; name: string }> {
  presets: T[];
  title: string;
  width?: string;
  value: string;
  onChange: (id: string) => void;
}

/**
 * Component for selecting platforms.
 */
export const ItemSelector = <T extends { id: string; name: string }>({
  presets,
  title,
  width,
  value,
  onChange,
}: ItemSelectorProps<T>) => {
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    if (event.target.value) {
      // @ts-expect-error geli
      onChange(event.target.value);
    }
  };
  return (
    <>
      <SectionHeading>{title}</SectionHeading>
      <StyledSelect sx={{ width: width ?? "100%" }} value={value} onChange={handleChange}>
        {presets.map((item) => (
          <StyledMenuItem key={item.id} value={item.id}>
            {item.name}
          </StyledMenuItem>
        ))}
      </StyledSelect>
    </>
  );
};
