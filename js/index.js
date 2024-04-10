


const openFile = document.getElementById('openFile');
openFile.onclick = async function () {
    const handle = await showDirectoryPicker();
    await processhandle(handle)
    console.log(handle)
    const treeTitle = document.querySelector(".treeTitle")
    treeTitle.innerHTML = handle.name
    const treeData = document.querySelector(".treeData")
    console.log("treeData===", treeData)
    readShowText(treeData, handle.children)
    // for (let index = 0; index < handle.children.length; index++) {
    //     const tree = document.createElement("div")
    //     tree.className = "tree"
    //     const element = handle.children[index];
    //     tree.innerHTML = element.name
    //     treeData.appendChild(tree)
    // }
    // readFile(handle.children[0])

}

// 处理回显文本
function readShowText(dom, data) {
    console.log("dom----", dom)
    for (let index = 0; index < data.length; index++) {
        const tree = document.createElement("div")
        tree.className = "tree"
        const element = data[index];
        tree.innerHTML = element.name
        console.log("dom----", dom)
        dom.appendChild(tree)
        if (element.children && element.children.length) {
            readShowText(tree, element.children)
        } else {
            tree.onclick = function () {
                readFile(element)
            }
        }
    }
}

// 递归处理句柄
const processhandle = async (handle) => {
    if (handle.kind === 'file') return
    const iter = await handle.entries();
    // console.log("iter===", iter)
    handle.children = []
    for await (const iterator of iter) {
        // console.log("iterator===", iterator)
        await processhandle(iterator[1])
        if (iterator[1].kind === 'file') {
            handle.children.push(iterator[1])
        } else handle.children.unshift(iterator[1])

    }
}
// 读取文件内容
const readFile = async (fileHandle) => {
    const file = await fileHandle.getFile();
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
        console.log(e.target.result)
        const content = document.querySelector('.content')
        const textContent = document.querySelector(".textContent")
        if(textContent) content.removeChild(textContent)
         // 创建一个新的元素来展示文件内容  
         const fileElement = document.createElement('pre');  
         fileElement.className = "textContent"
         fileElement.textContent = `\n${e.target.result}\n`;  
           
         // 将文件内容元素添加到展示区域  
         content.appendChild(fileElement);  
    }
    fileReader.onerror = function (e) {
        console.log(e)
    }
    fileReader.readAsText(file);

}