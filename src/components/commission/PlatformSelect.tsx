import { SectionHeading, StyledMenuItem, StyledSelect } from "../settings/settings.styled.tsx";
import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";

export interface ItemSelectorProps<T extends { id: string; name: string }> {
  presets: T[];
  title: string;
  width?: string;
}

/**
 * Component for selecting platforms.
 */
export const ItemSelector = <T extends { id: string; name: string }>({
  presets,
  title,
  width,
}: ItemSelectorProps<T>) => {
  const [selectedItem, setSelectedItem] = useState<string>(presets[0].id);
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    if (event.target.value) {
      // @ts-expect-error geli
      setSelectedItem(event.target.value);
    }
  };
  return (
    <>
      <SectionHeading>{title}</SectionHeading>
      <StyledSelect sx={{ width: width ?? "100%" }} value={selectedItem} onChange={handleChange}>
        {presets.map((item) => (
          <StyledMenuItem key={item.id} value={item.id}>
            {item.name}
          </StyledMenuItem>
        ))}
      </StyledSelect>
    </>
  );
};
