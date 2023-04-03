export interface HydraListInterface<T> {
  'hydra:totalItems': number;
  'hydra:member': T[];
}