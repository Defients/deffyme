import hashlib,json,pathlib,sys
base=pathlib.Path(__file__).resolve().parent.parent
expected=json.loads((base/'docs/legacy-baseline.json').read_text(encoding='utf-8'))
root=pathlib.Path(expected['root'])
files=sorted(p for p in root.rglob('*') if p.is_file())
h=hashlib.sha256(); size=0
for p in files:
 h.update(p.relative_to(root).as_posix().encode());h.update(b'\0');size+=p.stat().st_size
 with p.open('rb') as f:
  for chunk in iter(lambda:f.read(1048576),b''):h.update(chunk)
actual={'fileCount':len(files),'bytes':size,'sha256':h.hexdigest()}
actual['pass']=all(actual[k]==expected[k] for k in ('fileCount','bytes','sha256'))
(base/'artifacts').mkdir(exist_ok=True)
(base/'artifacts/legacy-verification.json').write_text(json.dumps(actual,indent=2)+'\n',encoding='utf-8')
print(json.dumps(actual));sys.exit(0 if actual['pass'] else 1)

