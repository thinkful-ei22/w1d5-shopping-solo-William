'use strict';

const STORE = {
  items : [
    {name: 'apples', checked: false},
    {name: 'oranges', checked: false},
    {name: 'milk', checked: true},
    {name: 'bread', checked: false}
  ],
  itemsChecked: false,
  searchItem: undefined,
};


function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span contenteditable="true" class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
  console.log('Generating shopping list element');

  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  
  return items.join('');
}


function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');

  let itemsToShow = [];
  if(STORE.itemsChecked === false){
    itemsToShow = STORE.items;
  }
  else{
    itemsToShow = STORE.items.filter(item => !item.checked);
  }
  if(STORE.searchItem !== undefined){
    itemsToShow = STORE.items.filter(item => item.name.includes(STORE.searchItem));
  }
  const shoppingListItemsString = generateShoppingItemsString(itemsToShow);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}


function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({name: itemName, checked: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    //$('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemIndex) {
  console.log('Toggling checked property for item at index ' + itemIndex);
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}


function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}



function deleteListItem(itemIndex) {
  console.log('Deleting item at index ' + itemIndex);
  STORE.items.splice(itemIndex,1);

}

function handleDeleteItemClicked() {
  // this function will be responsible for when users want to delete a shopping list
  // item
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    console.log('`handleDeleteItemCLicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    deleteListItem(itemIndex);
    renderShoppingList();

  });
}
function handleItemHide(){
  console.log('itemHide Ran');
}

function handleCheckedItemsSwitch(){
  //This function will toggle unchecked items from the DOM.  If item is checked, 
  //this function will hide it.  If the switch is turned off, this function 
  //will have all checked items reappear
  console.log('Checked Items Switch Ran');
  $('#js-show-only-unchecked-items').on('change', function(){
    if ( $('#js-show-only-unchecked-items')[0].checked ) { 
      STORE.itemsChecked = true;
      
      renderShoppingList();
    } else {
      STORE.itemsChecked = false;

      renderShoppingList();
    }
  });

  /*$('#js-shopping-list-form').on('click','#js-show-only-unchecked-items', function(event{
if (STORE[i].checked == true)
handleItemHide
  });
*/
} 
function handleSearchBar(){
  // get the value of the input field so we can filter the results
  $('.search-area').submit(function(event) {
    event.preventDefault();
    console.log('`handleSearchBar` ran');
    let inputItem = $('#search-display-filter').val();
    STORE.searchItem = inputItem;
  
    renderShoppingList();
    // deprecated: itemsToShow = STORE.items.filter(item => item.name.contains(toFilter));
    // code borrowed from: $(list).find('a:contains(' + filter + ')').parent().slideDown();
    // deprecated: const shoppingListItemsString = generateShoppingItemsString(itemsToShow);
    //deprecated: $('.js-shopping-list').html(shoppingListItemsString);
  });
}



// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  console.log('Hello World');
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleCheckedItemsSwitch();
  handleSearchBar();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);
