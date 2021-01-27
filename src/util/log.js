/**
 * Author:Daoxing.Huang
 * 平台日记配置，使用Log4js @see {@link https://github.com/log4js-node/log4js-node}
 * log4js的输出级别6个: trace, debug, info, warn, error, fatal,还有一个mark，没有看说明 
 * 
 * 类别说明 使用规则：
 * 对于日志级别的分类，有以下参考@see {@link https://zhuanlan.zhihu.com/p/27363484}：
 * FATAL — 表示需要立即被处理的系统级错误。当该错误发生时，表示服务已经出现了某种程度的不可用，
 * 系统管理员需要立即介入。这属于最严重的日志级别，因此该日志级别必须慎用，如果这种级别的日志经常出现，
 * 则该日志也失去了意义。通常情况下，一个进程的生命周期中应该只记录一次FATAL级别的日志，即该进程遇到无法恢复的错误而退出时。
 * 当然，如果某个系统的子系统遇到了不可恢复的错误，那该子系统的调用方也可以记入FATAL级别日志，以便通过日志报警提醒系统管理员修复；
 *
 * ERROR — 该级别的错误也需要马上被处理，但是紧急程度要低于FATAL级别。当ERROR错误发生时，已经影响了用户的正常访问。
 * 从该意义上来说，实际上ERROR错误和FATAL错误对用户的影响是相当的。FATAL相当于服务已经挂了，而ERROR相当于好死不如赖活着，
 * 然而活着却无法提供正常的服务，只能不断地打印ERROR日志。特别需要注意的是，ERROR和FATAL都属于服务器自己的异常，
 * 是需要马上得到人工介入并处理的。而对于用户自己操作不当，如请求参数错误等等，是绝对不应该记为ERROR日志的；
 *
 * WARN — 该日志表示系统可能出现问题，也可能没有，这种情况如网络的波动等。对于那些目前还不是错误，然而不及时处理也会变为错误的情况，
 * 也可以记为WARN日志，例如一个存储系统的磁盘使用量超过阀值，或者系统中某个用户的存储配额快用完等等。
 * 对于WARN级别的日志，虽然不需要系统管理员马上处理，
 * 也是需要及时查看并处理的。因此此种级别的日志也不应太多，能不打WARN级别的日志，就尽量不要打；
 *
 * INFO — 该种日志记录系统的正常运行状态，例如某个子系统的初始化，某个请求的成功执行等等。通过查看INFO级别的日志，
 * 可以很快地对系统中出现的 WARN,ERROR,FATAL错误进行定位。INFO日志不宜过多，通常情况下，INFO级别的日志应该不大于TRACE日志的10%；
 *
 * DEBUG or TRACE — 这两种日志具体的规范应该由项目组自己定义，该级别日志的主要作用是对系统每一步的运行状态进行精确的记录。通过该种日志，
 * 可以查看某一个操作每一步的执 行过程，可以准确定位是何种操作，何种参数，何种顺序导致了某种错误的发生。可以保证在不重现错误的情况下，
 * 也可以通过DEBUG（或TRACE）级别的日志对问题进行诊断。需要注意的是，DEBUG日志也需要规范日志格式，
 * 应该保证除了记录日志的开发人员自己外，其他的如运维，测试人员等也可以通过 DEBUG（或TRACE）日志来定位问题；
 */

import log4js from "log4js";
import {join} from 'path';
import { isDevelopment } from "./env";
// log4js的输出级别6个: trace, debug, info, warn, error, fatal
log4js.addLayout('requestId',(config)=>(logEvent) => config.requestId+JSON.stringify(logEvent));

log4js.configure({
    // 输出位置的基本信息设置
    appenders: {
        // 设置控制台输出 （默认日志级别是关闭的（即不会输出日志））
        out: {
            type: "console",
        },
        // 设置每天：以日期为单位,数据文件类型，dataFiel   注意设置pattern，alwaysIncludePattern属性
        // allLog: { type: 'dateFile', filename: './log/all', pattern: '-yyyy-MM-dd.log', alwaysIncludePattern: true },

        // 所有日志记录，文件类型file   文件最大值maxLogSize 单位byte (B->KB->M) backups:备份的文件个数最大值,最新数据覆盖旧数据
        allLog: {
            type: "file",
            filename: join(__dirname,("../../log/all.log")),
            keepFileExt: true,
            maxLogSize: 10485760,
            backups: 3,
        },

        // http请求日志 
        httpLog: {
            type: "file",
            filename: join(__dirname,("../../log/http.log")),
            pattern: ".yyyy-MM-dd-hh",
            keepFileExt: true,
            maxLogSize: 10485760,
            backups:5
        },

        // 错误日志 type:过滤类型logLevelFilter,将过滤error日志写进指定文件
        errorLog: {
            type: "file",
            filename: join(__dirname,("../../log/error.log")),
        },

        error: {
            type: "logLevelFilter",
            level: "error",
            appender: "errorLog",
        },
    },
    // 不同等级的日志追加到不同的输出位置：appenders: ['out', 'allLog']  
    // categories 作为getLogger方法的键名对应
    categories: {
    // appenders:采用的appender,取上面appenders项,level:设置级别
        http: {
            appenders: ["out", "httpLog"],
            level: isDevelopment()?"debug":'info',
        },
        default: {
            appenders: ["out", "allLog", "error","httpLog"],
            level: isDevelopment()?"debug":'info',
        }, 
        error: {
            appenders: ["out", "errorLog"],
            level: isDevelopment()?"debug":'info',
        },
    },
});


const logger = log4js.getLogger('default');

const errorLog = log4js.getLogger('error');

const httpLog = log4js.getLogger("http");

// const httpLogger  = log4js.connectLogger(httpLog, { level: 'WARN' });

// const httpLogger = (requestid)=> {
//     return () => {
//         return log4js.connectLogger(log4js.getLogger("http"), { layout: {requestid} });
//     };
// };

export  {logger,httpLog,errorLog};


