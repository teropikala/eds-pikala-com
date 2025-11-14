function extractContactInfo(fragment, label) {
  let value = null;

  const linkItems = fragment.querySelectorAll(':scope > div');

  const foundItem = [...linkItems].find((item) => {
    const divs = item.querySelectorAll('div');
    if (divs.length >= 2) {
      const itemLabel = divs[0].textContent.trim();
      return itemLabel === label;
    }
    return false;
  });

  if (foundItem) {
    const divs = foundItem.querySelectorAll('div');
    value = divs[1].textContent.trim();
  }

  return value;
}

function createContactSection(fragment) {
  const contactList = document.createElement('ul');
  contactList.className = 'contact';

  const linkedInUrl = extractContactInfo(fragment, 'LinkedIn');
  if (linkedInUrl) {
    contactList.innerHTML += `<li><a href="${linkedInUrl}" target="_blank"><span class="icon icon-linkedin"></span></a></li>`;
  }

  const email = extractContactInfo(fragment, 'Email');
  if (email) {
    contactList.innerHTML += `<li><a href="mailto:${email}"><span class="icon icon-email"></span></a></li>`;
  }

  return contactList;
}

/**
 * Get contact links from table and create a list
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const contactInfo = createContactSection(block);
  block.replaceWith(contactInfo);
}
