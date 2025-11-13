import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Creates logo element
 * @returns {HTMLElement} The logo h1 element
 */
function createLogo() {
  const a = document.createElement('a');
  a.href = '/';
  const img = document.createElement('img');
  img.src = '/images/logo.png';
  img.alt = 'Pikala Digital Consulting';
  a.append(img);
  return a;
}


/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {

  // load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  // decorate nav DOM
  block.textContent = '';
  const nav = document.createElement('nav');
  nav.id = 'nav';
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  block.append(createLogo());
  block.append(nav);
}
