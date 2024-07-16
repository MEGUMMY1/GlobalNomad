export interface mainPageStateProps {
  currentPage: number;
  itemsPerPage: number;
  selectedKategorie: string;
  selectedSorted: string;
  sortedName: string;
}

export interface mainPageKategorieStateProps {
  KategorieName: string;
}

export interface mainSearchValueStateProps {
  SearchValue: string;
  currentPage: number;
  itemsPerPage: number;
}
