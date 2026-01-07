import { SectionHeading, StyledMenuItem, StyledSelect } from "../settings/settings.styled.tsx";
import { SelectChangeEvent } from "@mui/material";

export interface ItemSelectorProps<T extends { id: string; name: string }> {
  presets: T[] | undefined;
  title: string;
  width?: string;
  name?: string;
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
  name,
}: ItemSelectorProps<T>) => {
  const hasPresetItems = presets && presets.length > 0;
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    if (event.target.value) {
      // @ts-expect-error geli
      onChange(event.target.value);
    }
  };
  return (
    <>
      <SectionHeading>{title}</SectionHeading>
      <StyledSelect
        name={name}
        sx={{ width: width ?? "100%" }}
        value={value}
        onChange={handleChange}
      >
        {!hasPresetItems && (
          <StyledMenuItem disabled value="">
            No items available
          </StyledMenuItem>
        )}
        {hasPresetItems &&
          presets.map((item) => (
            <StyledMenuItem key={item.id} value={item.id}>
              {item.name}
            </StyledMenuItem>
          ))}
      </StyledSelect>
    </>
  );
};
