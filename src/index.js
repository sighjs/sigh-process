import Promise from 'bluebird'
import { spawn } from 'child_process'
import { Bacon, log } from 'sigh-core'

export default function(op, cmd) {
  var proc = null
  if (! op.watch)
    return op.stream

  var splitCmd = cmd.split(' ')

  return op.stream.flatMap(events => {
    return Bacon.fromPromise(new Promise(function(resolve, reject) {
      log('spawn process `%s`', cmd)
      if (proc)
        proc.kill()

      proc = spawn(splitCmd[0], splitCmd.slice(1), {
        stdio: [ process.stdin, 'pipe', process.stderr ]
      })

      proc.stdout.pipe(process.stdout)

      proc.stdout.on('data', line => {
        if (resolve) {
          resolve()
          resolve = null
        }
      })
    }).thenReturn(events))
  })
}
