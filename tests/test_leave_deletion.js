const fs=require('fs'),vm=require('vm'),assert=require('assert');
const source=fs.readFileSync('static/script.js','utf8');
let saved, ack, resolveWrite;
const context={sharedStateLoaded:true,leaves:[{id:1},{id:2}],LEAVE_DATA_VERSION:1,
 localStorage:{setItem:(key,value)=>saved=JSON.parse(value)},
 writeSharedState:()=>new Promise(resolve=>resolveWrite=resolve),acknowledgeSavedState:p=>ack=p};
vm.createContext(context);
vm.runInContext(source.slice(source.indexOf('async function persistLeaveDeletion('),source.indexOf('async function persistDutyChange(')),context);
(async()=>{
 const pending=context.persistLeaveDeletion({id:1});
 assert.equal(context.leaves.length,2,'Keep row until server confirms');
 resolveWrite(); await pending;
 assert.equal(context.leaves.length,1);
 assert.equal(saved.leaves[0].id,2);
 assert.equal(ack.deletedRecords[0].key,'1');
 context.writeSharedState=async()=>{throw new Error('offline');};
 await assert.rejects(context.persistLeaveDeletion({id:2}),/offline/);
 assert.equal(context.leaves.length,1,'Failed deletion keeps row');
 context.sharedStateLoaded=false;
 await assert.rejects(context.persistLeaveDeletion({id:2}),/Sunucu bağlantısı/);
 console.log('PASS: confirmed deletion, local persistence, failure retention and unavailable server');
})().catch(error=>{console.error(error);process.exitCode=1;});
