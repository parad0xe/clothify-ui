export interface HydraList<T> {
  'hydra:totalItems': number;
  'hydra:member': T[];
}