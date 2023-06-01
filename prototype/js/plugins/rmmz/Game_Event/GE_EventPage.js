/**
 * @namespace Game_Event
 * @description Contains all methods relating to changing an event's page without the use of switches or self switches
 */


Game_Event.prototype.setPath = function(targetPath){

    const eventPages = this.event().pages; // Find all pages of the event
    const targetPageIndex = eventPages.findIndex(page => {

        const pageList = page.list.find(list => list.code === 108 && list.parameters[0].includes("<path>")); // Find page that contain comments
        if(!this.isPageListValid(pageList)) return;

        return pageList.parameters[0].toLowerCase().includes(`<path>${targetPath}</path>`); // Return page that includes the targetTag

    });

    if(targetPageIndex < 0){
        // Handle error
        return;
    }

    this._pageIndex = targetPageIndex; // Change the event's current page
    this.setupPage(); // Put the changes into effect
    
}

Game_Event.prototype.isPageListValid = function(targetPage){
    let valid = true;

    if(!targetPage) valid = false;
    if(!targetPage.parameters) valid = false;
    if(targetPage.parameters.length <= 0) valid = false;

    return valid;
}

Game_Event.prototype.getCurrentPath = function(){
    
    const pageList = this.page().list.find(list => list.code === 108 && list.parameters[0].includes("<path>")); // Find page that contains path comment

    if(!this.isPageListValid(pageList)) return;

    return pageList.parameters[0].split("<path>")[1].split("</path>")[0];
}