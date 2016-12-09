const config = require('../config');
const links = require('./links');

const regExp = /[.,]/;
function formatPrice(amount) {
  const rub = `${amount}`.split(regExp)[0];
  return rub.replace(/./g, (c, i, a) => {
    return i > 0 && (a.length - i) % 3 === 0 ? `${'\u00A0'}${c}` : c;
  });
}

module.exports = function generatePartName(item) {
  const brand = item.relatedBrand;
  const partgroup = item.partGroup;
  const partname = item.partName;
  if (!brand) return '';
  const brandTitle = brand.brand ? brand.brand.title : '';
  const modelTitle = brand.model ? brand.model.title : '';
  const generationTitle = brand.generation ? brand.generation.title : '';

  return `[${partgroup.title} ${partname.title} ${brandTitle} ${generationTitle || modelTitle} (${formatPrice(item.sellingPrice)} р.)](${links.part(item)})`;
};
