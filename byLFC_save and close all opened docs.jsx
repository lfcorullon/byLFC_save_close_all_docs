//DESCRIPTION: Save and Close all opened documents
//=============================================================
//  Script by Luis Felipe Corullón
//  Contato: lf@corullon.com.br
//  Site: http://scripts.corullon.com.br
//=============================================================

//CHECK DOCUMENTS LENGTH
if (!app.documents.length || (app.documents.length && !app.documents[0].visible)) {
    alert("There is no document(s) opened.","Script by LFCorullón");
    exit();
    }
else {
    //ADD NEW DIALOG WINDOW
    var myDialogConfirma = new Window ("dialog","Script by LFCorullón");
    //ADD A NEW PANEL TO THE NEW DIALOG WINDOW
    var myChoiceGroup = myDialogConfirma.add ("panel");
    //SET THE PANEL TO COLUMN (VERTICAL), LEFT AND CHILDREN ALIGNMENT TO THE LEFT
    myChoiceGroup.orientation = "column";
    myChoiceGroup.alignment = "left";
    myChoiceGroup.alignChildren = "left";
    //ADD RADIOBUTTON OPTIONS
    var closeBtn = myChoiceGroup.add ("radiobutton", undefined, "Close");
    var saveBtn = myChoiceGroup.add ("radiobutton", undefined, "Save");
    var saveCloseBtn = myChoiceGroup.add ("radiobutton", undefined, "Save and Close");
    //SET THE SAVE BUTTON AS DEFAULT
    saveBtn.value = true;
    //ADD A NEW GROUP TO THE DIALOG WINDOW
    var myButtonGroup = myDialogConfirma.add ("group");
    //SET THE GROUP TO COLUMN (VERTICAL) AND CENTER
    myButtonGroup.orientation = "column";
    myButtonGroup.alignment = "center";
    //ADD OK AND CANCEL BUTTONS
    myButtonGroup.add("button", [0,0,132,25], "OK");
    myButtonGroup.add("button", [0,0,132,25], "Cancel");
    
    //IF THE USER CLICKS OK
    if (myDialogConfirma.show() != 2) {
        //IF CLOSE RADIOBUTTON IS SELECTED
        if (closeBtn.value == true) {
            //RUN THE CLOSING FUNCTION
            Closing();
            }
        //IF SAVE RADIOBUTTON IS SELECTED
        if (saveBtn.value == true) {
            //STORE A VALUE TO THE CLOSE ACTION
            var myOptionClose = false;
            //RUN SAVINGCLOSING FUNCTION
            SavingClosing(myOptionClose);
            }
        //IF SAVECLOSE RADIOBUTTON IS SELECTED
        if (saveCloseBtn.value == true) {
            //STORE A VALUE TO THE CLOSE ACTION
            var myOptionClose = true;
            //RUN SAVINGCLOSING FUNCTION
            SavingClosing(myOptionClose);
            }
        }
    }

//======================================================================================================================
//====================================================================================================================== FUNCTIONS
//======================================================================================================================
function SavingClosing(myOptionClose) {
    //LOOP THROUGH ALL OPENED DOCUMENTS
    for (var i = app.documents.length-1; i >= 0; i--){
        var docs = app.documents[i];
        //IF IT'S SAVED, SET THE ZOOM TO FIT SPREAD (FUNCTION BELOW) AND SAVE
        if (docs.saved == true) {
            setZoom(app.documents[i]);
            docs.save();
            //IF MYOPTIONCLOSE IS TRUE, CLOSE THE DOCUMENT
            if (myOptionClose == true) {
                //CLOSE THE DOCUMENT WITH SAVE
                docs.close(SaveOptions.YES);
                }
            }
        //IF IT'S NOT SAVED
        else {
            //STORE SOME VARIABLES WITH OBJECT LENGTH, PAGE LENGTH AND DOCUMENT NAME
            var obj = app.documents[i].pageItems.length;
            var pgs = app.documents[i].pages.length
            var name = app.documents[i].name;
            //ALERT THE USER THAT THE FILE IS NOT SAVED AND ITS CONTENT
            alert ("The file is not saved.\r=======\rDocument's resume:\r=======\rFile name: "+name+"\rPages: "+pgs+"\rObject(s): "+obj);
            
            //ASK THE USER TO SAVE THE FILE THAT IS NOT SAVED
            var mySaveDialog = File(name).saveDlg("Choose a name and a folder where you want to save your file","InDesign document:*.indd");
            //IF THE SAVE DIALOG IS CANCELED
            if (mySaveDialog == null) {
                //SET TO THE NEXT DOCUMENT
                var docs = app.documents[i-1];
                }
            //IF THE USER CLICKS OK IN THE SAVE DIALOG
            else {
                //SET THE ZOOM, SAVE THE DOCUMENT
                setZoom(app.documents[i]);
                app.documents[i].save(mySaveDialog);
                //IF MYOPTIONCLOSE IS TRUE, CLOSE THE DOCUMENT, SAVING IT. IF NOT, SET TO THE NEXT DOCUMENT
                if (myOptionClose == true) {
                    app.documents[i].close(SaveOptions.YES);
                    } else {
                        var docs = app.documents[i-1];
                        }
                }
            }
        }
    }

function Closing() {
    //LOOP THROUGH ALL OPENED DOCUMENTS
    for (var i = app.documents.length-1; i >= 0; i--){
        //CLOSE WITHOUT SAVE
        app.documents[i].close(SaveOptions.NO);
        }
    }

function setZoom(myDoc) {
    app.activeWindow.zoom(ZoomOptions.FIT_SPREAD);
    //ZOOM OPTIONS
    //  ZoomOptions.ZOOM_IN
    //  ZoomOptions.ZOOM_OUT
    //  ZoomOptions.FIT_SPREAD
    //  ZoomOptions.FIT_PAGE
    //  ZoomOptions.SHOW_PASTEBOARD
    //  ZoomOptions.ACTUAL_SIZE
    //ZOOM OPTIONS
    }