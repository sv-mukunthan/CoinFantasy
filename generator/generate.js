const fsPromise = require('fs').promises;
const fs = require('fs');
let moduleName;
process.argv.forEach(function (val, index, array) {
  if (index === 2) {
    moduleName = val;
  }
});
const generator = require(`../config/generator/${moduleName}.js`);

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// console.log('generator', generator);
async function main() {
  try {
    // //View
    // let viewList = ``;
    // generator.parameters.forEach(param => {
    //   console.log('param', param);
    //   let viewWrap = `<div className="_MN__name_wrapper">
    //     <div className="_MN__name_label">${toTitleCase(param.name)}:</div>
    //     <div className="_MN__name">{state.details.${param.name}}</div>
    //   </div>\n`
    //   viewList += viewWrap;
    // });

    // let view = await fsPromise.readFile("./generator/view.tsx", "utf8");
    // let viewStyle = await fsPromise.readFile("./generator/view.scss", "utf8");
    // const dir = `./src/screens/${generator.moduleName.toLowerCase()}`
    // if (!fs.existsSync(dir)) {
    //   fs.mkdirSync(dir);
    // }
    // const newView = fs.createWriteStream(`./src/screens/${generator.moduleName.toLowerCase()}/${generator.moduleName.toLowerCase()}_view.screen.tsx`, { flags: "w" });
    // const newViewStyle = fs.createWriteStream(`./src/screens/${generator.moduleName.toLowerCase()}/${generator.moduleName.toLowerCase()}_view.screen.scss`, { flags: "w" });
    // let viewString = replaceViewWrap(view, viewList);
    // viewString = replaceName(viewString);
    // viewStyleString = replaceName(viewStyle);
    // newView.write(viewString);
    // newViewStyle.write(viewStyleString);

    // Create model
    let model = await fsPromise.readFile('./generator/model.ts', 'utf8');
    let modelContent = replaceName(model);
    let newModel = fs.createWriteStream(
      `./src/models/${generator.moduleName.toLowerCase()}.model.ts`,
      { flags: 'w' },
    );
    newModel.write(modelContent);
    // Import model
    let importModel = await fsPromise.readFile(
      './src/imports/models.import.ts',
      'utf8',
    );
    const newImportModel = fs.createWriteStream(
      `./src/imports/models.import.ts`,
      { flags: 'w' },
    );
    let newImportString = importNewModel(importModel);
    newImportModel.write(replaceName(newImportString));

    // Create list theads props
    const theads = [];
    generator.parameters.forEach((param) => {
      if (param.type === 'String' || param.type === 'Number') {
        theads.push({
          head: toTitleCase(param.name).replace('_', ' '),
          key: param.name,
        });
      }
    });

    // list
    let list = await fsPromise.readFile('./generator/list.tsx', 'utf8');
    let listStyle = await fsPromise.readFile('./generator/list.scss', 'utf8');
    const dir = `./src/screens/${generator.moduleName.toLowerCase()}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    const newList = fs.createWriteStream(
      `./src/screens/${generator.moduleName.toLowerCase()}/${generator.moduleName.toLowerCase()}.screen.tsx`,
      { flags: 'w' },
    );
    const newListStyle = fs.createWriteStream(
      `./src/screens/${generator.moduleName.toLowerCase()}/${generator.moduleName.toLowerCase()}.screen.scss`,
      { flags: 'w' },
    );
    listString = replaceName(list);
    listString2 = listString.replace('_THD_', JSON.stringify(theads));
    listStyleString = replaceName(listStyle);
    newList.write(listString2);
    newListStyle.write(listStyleString);

    // List create and edit
    let inputElements = ``;
    let creatableStateValue = ``;
    let editableStateValues = ``;
    let initialStateValue = ``;
    generator.parameters.forEach((param) => {
      let inputElement = '';
      if (
        param.type === 'String' ||
        param.type === 'Number' ||
        param.type === 'Boolean'
      ) {
        if (param.type === 'String' && param.hasOwnProperty('ref')) {
          initialStateValue += `${param.name}: ${addRandomTypes(param)},\n`;
        } else {
          initialStateValue += `${param.name}: '',\n`;
        }
        creatableStateValue += `${param.name}: state.${param.name},\n`;
        if (param.isEditable) {
          editableStateValues += `${param.name}: state.${param.name},\n`;
        }
        if (param.type === 'String') {
          if (param.isUploadable) {
            inputElement += `
            <div className="name_wrapper">
            <div className="name">${toTitleCase(param.name).replace(
              '_',
              ' ',
            )}</div>
            <input
              type='file'
              className="user_name"
              placeholder="${toTitleCase(param.name).replace('_', ' ')}"
              onChange={(event: any) => {
                setState({ ${param.name}: event.target.files[0].name });
              }}
            />
          </div>`;
          } else {
            inputElement += `<div className="name_wrapper">
            <div className="name">${toTitleCase(param.name).replace(
              '_',
              ' ',
            )}</div>
            <input
              className="user_name"
              placeholder="${toTitleCase(param.name).replace('_', ' ')}"
              value={state.${param.name}}
              onChange={(event: any) => setState({ ${
                param.name
              }: event.target.value })}
            />
          </div>`;
          }
        }
        if (param.type === 'Number') {
          inputElement += `<div className="name_wrapper">
            <div className="name">${toTitleCase(param.name).replace(
              '_',
              ' ',
            )}</div>
            <input
              type="number"
              className="user_name"
              placeholder="${toTitleCase(param.name).replace('_', ' ')}"
              value={state.${param.name}}
              onChange={(event: any) => setState({ ${
                param.name
              }: event.target.value })}
            />
          </div>`;
        }
      }
      inputElements += inputElement;
    });

    let create = await fsPromise.readFile('./generator/create.tsx', 'utf8');
    let createStyle = await fsPromise.readFile(
      './generator/create.scss',
      'utf8',
    );
    const dir2 = `./src/screens/${generator.moduleName.toLowerCase()}`;
    if (!fs.existsSync(dir2)) {
      fs.mkdirSync(dir2);
    }
    const newCreate = fs.createWriteStream(
      `./src/screens/${generator.moduleName.toLowerCase()}/create_${generator.moduleName.toLowerCase()}.screen.tsx`,
      { flags: 'w' },
    );
    const newCreateStyle = fs.createWriteStream(
      `./src/screens/${generator.moduleName.toLowerCase()}/create_${generator.moduleName.toLowerCase()}.screen.scss`,
      { flags: 'w' },
    );
    let createString = replaceViewWrap(create, inputElements);
    createString = replaceName(createString);
    createString = createString.replace(
      new RegExp('// _ISV_', 'g'),
      initialStateValue,
    );
    createString = createString.replace(
      new RegExp('// _ESV_', 'g'),
      editableStateValues,
    );
    createString = createString.replace(
      new RegExp('// _CSV_', 'g'),
      creatableStateValue,
    );
    createStyleString = replaceName(createStyle);
    newCreate.write(createString);
    newCreateStyle.write(createStyleString);

    // App route
    let appFile = await fsPromise.readFile('./src/App.tsx', 'utf8');
    const newAppFile = fs.createWriteStream('./src/App.tsx', 'utf8', {
      flags: 'w',
    });
    let newAppImportString = addNewListRoute(appFile);
    newAppFile.write(replaceName(newAppImportString));
  } catch (error) {
    console.log(error);
  }
}

function replaceName(string) {
  let str = string.replace(new RegExp('_MNS_', 'g'), generator.moduleName);
  str = str.replace(
    new RegExp('_MN_', 'g'),
    generator.moduleName.toLowerCase(),
  );
  str = str.replace(
    new RegExp('_MNC_', 'g'),
    generator.moduleName.toUpperCase(),
  );
  str = str.replace('// @ts-nocheck', '');
  return str;
}

function replaceViewWrap(string, viewWrap) {
  let str = string.replace(new RegExp('_VW_', 'g'), viewWrap);
  return str;
}

function defineRoute(string) {
  let moduleName = generator.moduleName.toLowerCase();
  let NR = `import ${moduleName}Route from "./routes/v1/${moduleName}.route";\n//_NR_`;
  let NRD = `app.use("/api/v1/${moduleName}", ${moduleName}Route);\n//_NRD_`;

  let str = string.replace(new RegExp('//_NR_', 'g'), NR);
  str = str.replace(new RegExp('//_NRD_', 'g'), NRD);
  return str;
}

function addModelObject(string, object) {
  string = string.replace(new RegExp('_MO_', 'g'), object);
  return string;
}

function addSearchQuery(string, object) {
  string = string.replace(new RegExp('_MSEARCH_', 'g'), object);
  return string;
}

function addInterface(string, interface) {
  string = string.replace(new RegExp('_IM_', 'g'), interface.module);
  string = string.replace(new RegExp('_IMC_', 'g'), interface.create);
  string = string.replace(new RegExp('_IMG_', 'g'), interface.get);
  string = string.replace(new RegExp('_IME_', 'g'), interface.edit);
  return string;
}

function addValidation(string, validation) {
  string = string.replace(new RegExp('_VC_', 'g'), validation.create);
  string = string.replace(new RegExp('_VE_', 'g'), validation.edit);
  return string;
}

function addTest(string, test) {
  string = string.replace(new RegExp('_TCB_', 'g'), test.create);
  string = string.replace(new RegExp('_TEB_', 'g'), test.edit);
  string = string.replace(new RegExp('_TEK_', 'g'), test.editKey);
  return string;
}

function addRandomTypes({ type, subType, ref }) {
  let value;
  if (type.toLowerCase() === 'string') {
    value = '"qwertyuiop"';
    if (ref) {
      value = '"623980a44794ef59b9024c15"';
    }
  } else if (type.toLowerCase() === 'number') {
    value = 1234567890;
  } else if (type.toLowerCase() === 'date') {
    value = new Date();
  } else if (type.toLowerCase() === 'array') {
    if (subType.toLowerCase() === 'string') {
      value = '["qwerty", "uiop"]';
    } else if (subType.toLowerCase() === 'number') {
      value = '[12345, 67890]';
    }
  }
  return value;
}

// function importModel(string) {
//   const importString = `import address from 'models/address';\n// _NMI_`
//   let str = string.replace(new RegExp("_NMI_", "g"),);
// }

function importNewModel(string) {
  let moduleName = generator.moduleName.toLowerCase();
  let NMI = `import ${moduleName} from "models/${moduleName}.model";\n// _NMI_`;
  let NM = `${moduleName},\n  // _NM_`;

  let str = string.replace(new RegExp('// _NMI_', 'g'), NMI);
  str = str.replace(new RegExp('// _NM_', 'g'), NM);
  return str;
}

function addNewRoute(string) {
  let moduleName = generator.moduleName.toLowerCase();
  let NSI = `import ${generator.moduleName}Screen  from 'screens/${moduleName}/${moduleName}.screen';\n// _NSI_`;
  const NR = `<Route path="/${moduleName}" element={<Main><${generator.moduleName}Screen /></Main>}></Route>\n          _NR_`;

  let str = string.replace(new RegExp('// _NSI_', 'g'), NSI);
  let str1 = str.replace('{/*', '');
  let str2 = str1.replace('*/}', '');
  str = str.replace(new RegExp('_NR_', 'g'), NR);
  return str;
}

function addNewListRoute(string) {
  let moduleName = generator.moduleName.toLowerCase();
  let NSI = `import Create${
    generator.moduleName
  }  from 'screens/${moduleName}/create_${generator.moduleName.toLowerCase()}.screen';
             import ${
               generator.moduleName
             }Screen  from 'screens/${moduleName}/${moduleName}.screen';\n// _NSI_`;

  const NR = `<Route path="/${moduleName}" element={<Main><${generator.moduleName}Screen /></Main>}></Route>\n
              <Route path="/add_${moduleName}" element={<Main><Create${generator.moduleName} /></Main>}></Route>\n
              <Route path="/edit_${moduleName}/:id" element={<Main><Create${generator.moduleName} /></Main>}></Route>\n          _NR_`;

  let str = string.replace(new RegExp('// _NSI_', 'g'), NSI);
  let str1 = str.replace('{/*', '');
  let str2 = str1.replace('*/}', '');
  str = str.replace(new RegExp('_NR_', 'g'), NR);
  return str;
}

main();
