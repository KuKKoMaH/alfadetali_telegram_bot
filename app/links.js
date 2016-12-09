const config = require('../config');

const filterCargo = (cargo) => { return cargo ? 'trucks' : 'cars'; };

function catalog(item) {
  const brand = item.relatedBrand;
  const partgroup = item.partGroup;
  const partname = item.partName;

  return url = `${config.baseUrl}${
    brand.brand ? filterCargo(brand.brand.cargo) : 'all'}/${
    brand.brand ? brand.brand.titleTranslit : 'all'}/${
    brand.model ? brand.model.titleTranslit : 'all'}/${
    brand.generation ? brand.generation.titleTranslit : 'all'}/${
    partgroup ? partgroup.titleTranslit : 'all'}/${
    partname ? partname.titleTranslit : 'all'}/`;
}

function part(item) {
  return `${catalog(item)}${item.barcode}`;
}

function search(q) {
  return `${config.baseUrl}search/?q=${encodeURIComponent(q)}`
}

module.exports = {
  catalog,
  part,
  search,
};
