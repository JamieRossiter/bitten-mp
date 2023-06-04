/**
 * @namespace Game_Event
 * @description Contains all methods relating to changing an event's page without the use of switches or self switches
 */

Game_Event.prototype.isPageListValid = function(targetPage){
    if(!targetPage){
        return false;
    }  
    if(!targetPage.parameters){
        return false;
    }
    if(targetPage.parameters.length <= 0){
        return false;
    }
    return true;
}

Game_Event.prototype.getCurrentPage = function(pageType){

    const pageList = this.page().list.find(list => list.code === 108 && list.parameters[0].includes(`<${pageType}>`)); // Find page that contains path comment

    if(!this.isPageListValid(pageList)) return;

    return pageList.parameters[0].split(`<${pageType}>`)[1].split(`</${pageType}>`)[0];

}

Game_Event.prototype.getCurrentState = function(){
    return this.getCurrentPage("state");
}

Game_Event.prototype.getCurrentPath = function(){
    return this.getCurrentPage("path");
}

Game_Event.prototype.setDown = function(){
    this.setPage("state", "down");
}

Game_Event.prototype.setPath = function(targetPath){
    if(this.getCurrentState() === "down") return;
    this.setPage("path", targetPath);
}

Game_Event.prototype.setPage = function(pageType, targetPage){

    const eventPages = this.event().pages; // Find all pages of the event
    const targetPageIndex = eventPages.findIndex(page => {

        const pageList = page.list.find(list => list.code === 108 && list.parameters[0].includes(`<${pageType}>`)); // Find page that contain comments
        if(!this.isPageListValid(pageList)) return;

        return pageList.parameters[0].toLowerCase().includes(`<${pageType}>${targetPage}</${pageType}>`); // Return page that includes the targetTag

    });

    if(targetPageIndex < 0){
        // Handle error
        return;
    }

    this._pageIndex = targetPageIndex; // Change the event's current page
    this.setupPage(); // Put the changes into effect

}