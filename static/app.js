(() => {
  const translations = {
    tr: {
      'brand.name':'GitFlow Manager','header.noProject':'Proje seçilmedi','workspace.local':'Yerel çalışma alanı','workspace.personal':'Kişisel ortam','nav.overview':'GENEL BAKIŞ','nav.dashboard':'Kontrol Paneli','nav.projects':'Projeler','nav.workspace':'Çalışma Alanı','nav.activity':'Aktivite','nav.collaboration':'İŞ BİRLİĞİ','nav.collaborators':'Proje Ortakları','nav.account':'Git Hesabı','nav.system':'SİSTEM','nav.settings':'Ayarlar','local.status':'Yerel mod aktif','local.security':'İşlemler bu bilgisayarda çalışır','user.developer':'Geliştirici alanı','footer.openSource':'Açık kaynak geliştirici aracı','footer.localOnly':'Yalnızca bu bilgisayarda',
      'dashboard.eyebrow':'GELİŞTİRİCİ MERKEZİ','dashboard.title':'Geliştirme alanına hoş geldin.','dashboard.subtitle':'Projelerini, kod değişikliklerini ve ekip hareketlerini tek merkezden yönet.','dashboard.addProject':'Proje bağla','stats.projects':'Bağlı projeler','stats.projectsHint':'Yerel proje kütüphanen','stats.changes':'Bekleyen değişiklikler','stats.changesHint':'Aktif projedeki dosyalar','stats.branch':'Aktif dal','stats.branchHint':'Geçerli çalışma dalı','stats.github':'GitHub hesabı','stats.githubAction':'Hesabı yönet','dashboard.liveFeed':'CANLI ÖZET','dashboard.recentActivity':'Son commit aktiviteleri','common.viewAll':'Tümünü gör','dashboard.library':'PROJE KÜTÜPHANESİ','dashboard.yourProjects':'Projelerin','common.changes':'değişiklik','projects.noProjects':'Henüz proje eklenmedi.','dashboard.connectFirst':'İlk projeni bağla','dashboard.manageProjects':'Tüm projeleri yönet','dashboard.quickActions':'Hızlı işlemler','dashboard.quickSubtitle':'Günlük geliştirme akışına buradan devam et.','quick.workspace':'Çalışma alanını aç','quick.workspaceHint':'Dosya durumu ve commit işlemleri','quick.account':'GitHub hesabını bağla','quick.accountHint':'Depolarını ve hesabını senkronize et','quick.collaborators':'Ekip erişimini yönet','quick.collaboratorsHint':'Ortakları ve izinleri görüntüle',
      'projects.eyebrow':'YEREL DEPO KÜTÜPHANESİ','projects.title':'Projeler','projects.subtitle':'Bağlı depolarını tek yerde görüntüle, aralarında geçiş yap ve erişim durumlarını yönet.','projects.add':'Klasör seçerek bağla','projects.search':'Proje adı veya klasör yolunda ara','projects.filterAll':'Tüm projeler','projects.filterAvailable':'Erişilebilir','projects.filterMissing':'Erişilemiyor','projects.filterChanges':'Değişikliği olanlar','projects.available':'Bağlı','projects.missing':'Bulunamadı','projects.current':'Aktif proje','projects.openWorkspace':'Çalışma alanı','projects.activate':'Aktif yap','projects.remove':'Listeden kaldır','projects.emptyTitle':'Henüz bağlı proje yok','projects.emptyHint':'Bir proje klasörü seç. Git deposu değilse GitFlow Manager onu oluşturmayı önerecek.','projects.searchEmpty':'Bu filtreyle eşleşen proje yok.','projects.searchEmptyHint':'Arama metnini veya filtreleri değiştir.','projects.localTitle':'Projelerin senin bilgisayarında kalır','projects.localHint':'GitFlow Manager proje yollarını kaydeder; bir projeyi listeden kaldırmak dosyalarını silmez.',
      'workspace.eyebrow':'GIT İŞ AKIŞI','workspace.title':'Çalışma alanı','workspace.subtitle':'Değişikliklerini incele, kalite kontrolünden geçir ve güvenle gönder.','common.refresh':'Yenile','workspace.switchProject':'Proje seç','workspace.disconnect':'Bağlantıyı kes','workspace.connected':'Bağlı','workspace.lastCommit':'Son commit:','workspace.remotes':'remote','workspace.history':'Geçmiş','workspace.filesKicker':'ÇALIŞMA AĞACI','workspace.filesTitle':'Dosya değişiklikleri','workspace.runLint':'Kalite kontrolü','workspace.file':'Dosya','workspace.status':'Durum','workspace.code':'Kod','workspace.clean':'Çalışma ağacı temiz. Bekleyen değişiklik yok.','commit.typeFeat':'feat · Yeni özellik','commit.typeFix':'fix · Hata düzeltme','commit.typeRefactor':'refactor · Yeniden düzenleme','commit.typeDocs':'docs · Dokümantasyon','commit.typeChore':'chore · Bakım','stats.notConnected':'Bağlanmadı','account.connected':'Bağlı','account.repoCount':'depo','account.email':'E-posta','collaborators.siteAdmin':'GitHub site yöneticisi','collaborators.member':'GitHub ortağı','commit.kicker':'YAYIN AKIŞI','commit.title':'Commit & Push','commit.subtitle':'Göndermeden önce değişiklikler otomatik olarak taranır.','commit.type':'Değişiklik türü','commit.description':'Kısa açıklama','commit.placeholder':'Örn. proje filtrelerini ekle','commit.preview':'Commit mesajı','commit.send':'Kontrol et ve gönder','commit.localNote':'İşlem yerel Git kimlik bilgilerini kullanır.','remote.kicker':'UZAK DEPOLAR',"remote.title":"Git remote'ları",'remote.empty':'Henüz remote tanımlanmamış.','remote.add':'Remote ekle','workspace.noProject':'Çalışma alanı için proje seç','workspace.noProjectHint':'Bir yerel Git deposu bağlayarak dosyalarını, commit\'lerini ve remote ayarlarını yönetmeye başlayabilirsin.','workspace.chooseFolder':'Proje klasörü seç','workspace.orExisting':'veya bağlı projelerinden birini seç',
      'activity.eyebrow':'DEĞİŞİKLİK GEÇMİŞİ','activity.title':'Aktivite akışı','activity.subtitle':'Aktif depoda commit\'leri, katkı sağlayanları ve yapılan işleri incele.','activity.committed':'commit oluşturdu','activity.noHistory':'Henüz commit geçmişi yok','activity.noHistoryHint':'Bir proje bağladığında etkinlikler burada görünür.','activity.historyKicker':'GIT LOG','activity.historyTitle':'Commit geçmişi','activity.localTab':'Yerel Git','activity.githubTab':'GitHub akışı','activity.commits':'commit','activity.team':'Ekip katkılarını gör','activity.noProject':'Aktivite için bir proje seç','activity.noProjectHint':'Commit geçmişini incelemek için bir Git deposu bağla.',
      'collaborators.eyebrow':'EKİP VE ERİŞİM','collaborators.title':'Proje ortakları','collaborators.subtitle':'Depoya katkı sağlayan kişileri ve GitHub erişim izinlerini görüntüle.','collaborators.activeRepo':'AKTİF PROJE','collaborators.githubRemote':'GitHub deposu','collaborators.noGithubRemote':'GitHub remote bulunamadı','collaborators.membersKicker':'REPO ERİŞİMİ','collaborators.membersTitle':'Erişimi olan kişiler','collaborators.inviteKicker':'ERİŞİMİ YÖNET','collaborators.inviteTitle':'Ortak davet et','collaborators.inviteHint':'GitHub kullanıcı adını ve erişim seviyesini seç. Kullanıcının daveti kabul etmesi gerekebilir.','collaborators.username':'GitHub kullanıcı adı','collaborators.usernamePlaceholder':'kullaniciadi','collaborators.permission':'Erişim seviyesi','permission.pull':'Read · Görüntüleme','permission.triage':'Triage · İş takibi','permission.push':'Write · Kod gönderme','permission.maintain':'Maintain · Bakım','permission.admin':'Admin · Tam yönetim','collaborators.sendInvite':'Davet gönder','collaborators.permissionNote':'Bu işlem GitHub API üzerinden yürütülür ve uygun depo yönetim izni gerektirir.','collaborators.noRemoteTitle':'Bu projede GitHub remote yok','collaborators.noRemoteHint':'Ortakları görüntülemek için GitHub üzerindeki depoya bağlanan bir remote ekle.','collaborators.goWorkspace':'Remote ayarlarına git','collaborators.noProject':'Önce bir proje bağla','collaborators.noProjectHint':'Ortakları yönetmek için GitHub deposu ile eşleştirilmiş yerel bir proje seç.',
      'account.eyebrow':'KAYNAK KOD HESABI','account.title':'Git hesabı','account.subtitle':'GitHub kimliğini bağla, erişebildiğin depoları keşfet ve projelerini yerel çalışma alanına al.','account.profileKicker':'HESAP DURUMU','account.profileTitle':'GitHub bağlantısı','account.repositoriesKicker':'UZAK DEPOLAR','account.repositoriesTitle':'GitHub projelerin','account.searchRepos':'GitHub depolarında ara','account.connectToSeeRepos':'Depolarını görmek için GitHub hesabını bağla.','account.connectTitle':'GitHub hesabını bağla','account.connectHint':'Kişisel erişim belirteci ile hesabını doğrula. Belirteç yalnızca bu bilgisayarda saklanır.','account.tokenLabel':'Personal access token','account.tokenPlaceholder':'ghp_… veya github_pat_…','account.connectButton':'Hesabı doğrula ve bağla','account.securityNote':'Token arayüzde tekrar gösterilmez. Yerel yapılandırma dosyası sınırlı dosya izinleriyle saklanır.','account.disconnect':'Bağlantıyı kaldır','account.securityKicker':'ERİŞİM KAPSAMI','account.securityTitle':'Gerekli izinler','account.scopeProfile':'Hesap ve depo listesini görüntüleme','account.scopeProfileHint':'Profil, depo adı ve görünürlük bilgileri','account.scopeCollaborators':'Ortakları yönetme','account.scopeCollaboratorsHint':'İzinleri listelemek ve değiştirmek için depo yönetim yetkisi','account.scopeWarning':'En düşük gerekli yetkilere sahip bir token kullan. GitHub, belirtecin erişim kapsamına ve hesabının depo izinlerine göre işlemleri kısıtlar.',
      'settings.eyebrow':'UYGULAMA TERCİHLERİ','settings.title':'Ayarlar','settings.subtitle':'GitFlow Manager deneyimini ve yerel veri yönetimini özelleştir.','settings.appearance':'Görünüm','settings.appearanceHint':'Tema ve dil ayarları bu tarayıcıda saklanır.','settings.theme':'Renk teması','settings.themeHint':'Göz konforuna göre açık veya koyu görünümü seç.','settings.light':'Açık','settings.dark':'Koyu','settings.language':'Arayüz dili','settings.languageHint':'Menüler ve sistem mesajları için dil tercihi.','settings.reduceMotion':'Hareketi azalt','settings.reduceMotionHint':'Geçiş animasyonlarını sistem tercihlerine uygun sınırla.','settings.localData':'Yerel veriler','settings.localDataHint':'Bu bilgisayardaki GitFlow Manager kayıtları.','settings.projectsSaved':'Bağlı proje listesi','settings.manageProjects':'Projeleri yönet','settings.githubSaved':'GitHub belirteci','settings.manageAccount':'Hesabı yönet','settings.securityTitle':'Önce yerel güvenlik','settings.securityHint':'Uygulama 127.0.0.1 adresinde çalışır. Git işlemleri shell üzerinden birleştirilmiş komutlar yerine argüman listeleriyle yürütülür.','settings.securityLocal':'Yerel arayüz kısıtlaması','settings.securityCsrf':'İstek doğrulaması','settings.securityLint':'Commit öncesi kalite kontrolü','settings.about':'Açık kaynak geliştirici aracı','settings.aboutHint':'Git deposu yönetimi, commit kontrolü ve ekip görünürlüğü tek bir yerel araçta.',
      'common.loading':'Yükleniyor...','fileStatus.modified':'Değiştirildi','fileStatus.added':'Eklendi','fileStatus.untracked':'İzlenmiyor','fileStatus.deleted':'Silindi','fileStatus.conflict':'Çakışma','fileStatus.renamed':'Yeniden adlandırıldı','fileStatus.copied':'Kopyalandı','fileStatus.changed':'Değişti',
      'toast.success':'Başarılı','toast.pushExistingSuccess':'Önceden oluşturulan commit’ler başarıyla gönderildi.','toast.error':'İşlem başarısız','toast.connected':'Proje bağlandı.','toast.repositoryInitialized':'Git deposu oluşturuldu ve projeye bağlandı.','toast.disconnected':'Proje bağlantısı kesildi.','toast.projectRemoved':'Proje listeden kaldırıldı.','toast.githubConnected':'GitHub hesabı bağlandı.','toast.githubDisconnected':'GitHub bağlantısı kaldırıldı.','toast.remoteSaved':'Remote kaydedildi.','toast.remoteRemoved':'Remote kaldırıldı.','toast.collaboratorInvited':'Ortak daveti gönderildi.','toast.collaboratorRemoved':'Ortak erişimi kaldırıldı.','toast.cloned':'Depo yerel bilgisayara klonlandı.','toast.lintClean':'Kalite kontrolü temiz. Gönderime hazır.','toast.noFindings':'Engelleyici bir sorun bulunmadı.','toast.confirmRemoveProject':'Bu projeyi yalnızca GitFlow Manager listesinden kaldırmak istiyor musun? Dosyalar silinmez.','toast.confirmRemoveRemote':'Bu remote bağlantısı kaldırılsın mı?','toast.confirmDisconnectGithub':'GitHub hesabının bu uygulamayla bağlantısını kaldırmak istiyor musun?','toast.confirmRemoveCollaborator':'Bu kullanıcının depoya erişimi kaldırılsın mı?','error.repository_not_selected':'Önce bir Git deposu seç.','error.repository_path_invalid':'Seçilen klasör yolu geçerli değil.','error.repository_not_initialized':'Seçilen klasörde henüz Git deposu yok.','repo.initializeConfirm':'Bu klasörde henüz Git deposu yok. Burada yeni bir Git deposu oluşturulsun mu? Var olan dosyalar silinmez; commit öncesinde dosyaları ayrıca stage etmen gerekir.','repo.nestedFound':'Seçtiğin klasörün içinde Git depoları bulundu:','repo.nestedPrompt':'Bağlanmak istediğin deponun numarasını yaz. Boş bırakıp Enter\'a basarsan seçilen üst klasörde yeni Git deposu oluşturma seçeneği açılır.','repo.invalidNestedChoice':'Geçerli bir depo numarası girilmedi. Klasör seçme işlemini yeniden deneyebilirsin.','error.folder_picker_unavailable':'Klasör seçici açılamadı. Python kurulumunda Tk desteği gerekebilir.','error.folder_selection_cancelled':'Klasör seçimi iptal edildi.','error.git_not_installed':'Git bulunamadı. Git kurulumunu kontrol et.','error.remote_not_configured':'Önce bir Git remote ekle.','error.push_remote_ambiguous':'Bu dal için gönderilecek remote otomatik seçilemedi. Remote ayarlarını kontrol et.','error.branch_detached':'Gönderim için önce bir dala geç.','error.nothing_to_commit':'Commit edilecek bir değişiklik bulunamadı.','error.invalid_commit_type':'Commit türü geçersiz.','error.invalid_commit_description':'Açıklamayı kontrol et.','error.commit_description_too_short':'Açıklama en az 5 karakter olmalı.','error.commit_description_period':'Açıklama nokta ile bitmemeli.','error.commit_message_too_long':'Commit mesajı 72 karakteri geçmemeli.','error.lint_failed':'Kalite kontrolü sorun buldu. Commit oluşturulmadı.','error.push_failed_after_commit':'Commit oluşturuldu ancak push başarısız oldu.','error.github_not_connected':'Önce GitHub hesabını bağla.','error.github_token_invalid':'GitHub token geçersiz veya süresi dolmuş.','error.github_token_invalid_format':'Token biçimini kontrol et.','error.github_permission_denied':'GitHub bu işlem için yeterli izin vermedi. Token kapsamını ve depo izinlerini kontrol et.','error.github_resource_not_found':'Depo veya kullanıcı bulunamadı ya da erişimin yok.','error.github_validation_failed':'GitHub bu isteği doğrulayamadı. Kullanıcı ve izin ayarlarını kontrol et.','error.github_network_error':'GitHub API bağlantısı kurulamadı. İnternet bağlantını kontrol et.','error.github_remote_not_found':'Aktif projenin remote adresinden bir GitHub deposu belirlenemedi.','error.github_clone_url_invalid':'Geçerli bir GitHub klon adresi seç.','error.github_username_invalid':'Geçerli bir GitHub kullanıcı adı gir.','error.github_permission_invalid':'Geçerli bir izin seviyesi seç.','error.github_clone_failed':'Depo klonlanamadı. Remote erişimini ve Git kimlik doğrulamasını kontrol et.','error.git_clone_failed':'GitHub deposu klonlanamadı. Erişimi ve hedef klasörü kontrol et.','error.clone_target_exists':'Seçilen konumda aynı isimli klasör zaten var.','error.clone_target_invalid':'Klonlama konumu geçerli değil.','error.csrf_invalid':'Güvenlik doğrulaması başarısız. Sayfayı yenileyip tekrar dene.','error.git_timeout':'Git işlemi zaman aşımına uğradı.','error.git_command_failed':'Git komutu başarısız oldu.','error.git_execution_failed':'Git komutu çalıştırılamadı.','error.local_only':'Uygulama yalnızca yerel bilgisayardan kullanılabilir.','error.network_error':'Yerel uygulamaya ulaşılamadı. Uygulamanın çalıştığını kontrol et.','error.invalid_remote_name':'Remote adı geçersiz.','error.invalid_remote_url':'Remote adresi geçersiz.','error.invalid_remote_action':'Geçersiz remote işlemi.','error.remote_not_found':'Remote bulunamadı.','error.github_collaborator_action_invalid':'Ortak işlemi geçersiz.','error.github_response_invalid':'GitHub yanıtı okunamadı.','error.github_api_error':'GitHub API isteği başarısız oldu.','error.github_conflict':'GitHub bu işlemde bir çakışma bildirdi.','error.unknown':'Beklenmeyen bir hata oluştu.','modal.remoteAddTitle':'Remote ekle','modal.remoteEditTitle':'Remote düzenle','modal.remoteSubtitle':'GitHub, GitLab veya başka bir Git sağlayıcısının uzak depo adresini gir.','modal.remoteName':'Remote adı','modal.remoteUrl':'Fetch / push adresi','modal.cancel':'Vazgeç','modal.save':'Kaydet','modal.clone':'Klonla','account.clone':'Yerel bilgisayara klonla','account.openGithub':'GitHub’da aç','account.private':'Özel','account.public':'Herkese açık','account.updated':'Güncellendi','account.noRepos':'Görüntülenecek depo yok.','account.cloneHint':'Klonlama konumunu seçtiğinde GitFlow Manager depoyu indirir.','collaborators.noMembers':'GitHub API ortak listesi döndürmedi.','collaborators.role.admin':'Yönetici','collaborators.role.write':'Yazma','collaborators.role.read':'Okuma','collaborators.role.maintain':'Bakım','collaborators.role.triage':'İş takibi','collaborators.remove':'Erişimi kaldır','collaborators.editAccess':'Erişimi düzenle','collaborators.changeAccess':'Erişim seviyesini değiştir','collaborators.accessUpdated':'Ortak erişim seviyesi güncellendi.','collaborators.invitedPending':'Davet oluşturuldu; karşı tarafın kabul etmesi gerekebilir.','lint.findingsTitle':'Kalite kontrolü engelleyici sorun buldu','lint.findingLine':'Satır','lint.kind.console_log':'console.log kalıntısı','lint.kind.print_call':'print() çağrısı','lint.kind.debug_statement':'debugger kalıntısı','lint.kind.dd_call':'dd() çağrısı','lint.kind.unfinished_marker':'TODO işareti','lint.kind.aws_key':'AWS anahtarı','lint.kind.github_token':'GitHub token olasılığı','lint.kind.gitlab_token':'GitLab token olasılığı','lint.kind.service_key':'Servis anahtarı olasılığı','lint.kind.jwt':'JWT token olasılığı','lint.kind.private_key_header':'Özel anahtar işaretçisi','lint.kind.credential_assignment':'Hassas bilgi ataması','lint.kind.file_too_large':'Dosya tarama sınırını aşıyor','lint.kind.file_unreadable':'Dosya okunamadı'
    },
    en: {
      'brand.name':'GitFlow Manager','header.noProject':'Proje seçilmedi','workspace.local':'Local workspace','workspace.personal':'Personal environment','nav.overview':'OVERVIEW','nav.dashboard':'Dashboard','nav.projects':'Projects','nav.workspace':'Workspace','nav.activity':'Activity','nav.collaboration':'COLLABORATION','nav.collaborators':'Collaborators','nav.account':'Git Account','nav.system':'SYSTEM','nav.settings':'Settings','local.status':'Local mode active','local.security':'Operations run on this computer','user.developer':'Developer workspace','footer.openSource':'Open-source developer tool','footer.localOnly':'Local computer only',
      'dashboard.eyebrow':'DEVELOPER HUB','dashboard.title':'Welcome to your development space.','dashboard.subtitle':'Manage projects, code changes and team activity from one place.','dashboard.addProject':'Connect project','stats.projects':'Connected projects','stats.projectsHint':'Your local project library','stats.changes':'Pending changes','stats.changesHint':'Files in the active project','stats.branch':'Active branch','stats.branchHint':'Current working branch','stats.github':'GitHub account','stats.githubAction':'Manage account','dashboard.liveFeed':'LIVE OVERVIEW','dashboard.recentActivity':'Recent commit activity','common.viewAll':'View all','dashboard.library':'PROJECT LIBRARY','dashboard.yourProjects':'Your projects','common.changes':'changes','projects.noProjects':'No projects added yet.','dashboard.connectFirst':'Connect your first project','dashboard.manageProjects':'Manage all projects','dashboard.quickActions':'Quick actions','dashboard.quickSubtitle':'Continue your daily development flow.','quick.workspace':'Open workspace','quick.workspaceHint':'File status and commit operations','quick.account':'Connect GitHub account','quick.accountHint':'Sync your repositories and account','quick.collaborators':'Manage team access','quick.collaboratorsHint':'View collaborators and permissions',
      'projects.eyebrow':'LOCAL REPOSITORY LIBRARY','projects.title':'Projects','projects.subtitle':'View connected repositories, switch between them and manage their connection status.','projects.add':'Connect by choosing a folder','projects.search':'Search project name or folder path','projects.filterAll':'All projects','projects.filterAvailable':'Available','projects.filterMissing':'Unavailable','projects.filterChanges':'With changes','projects.available':'Connected','projects.missing':'Unavailable','projects.current':'Active project','projects.openWorkspace':'Workspace','projects.activate':'Set active','projects.remove':'Remove from list','projects.emptyTitle':'No connected projects yet','projects.emptyHint':'Choose a project folder. If it is not a Git repository yet, GitFlow Manager can initialize it for you.','projects.searchEmpty':'No projects match this filter.','projects.searchEmptyHint':'Try another search term or filter.','projects.localTitle':'Your projects stay on your computer','projects.localHint':'GitFlow Manager stores project paths; removing a project from the list does not delete its files.',
      'workspace.eyebrow':'GIT WORKFLOW','workspace.title':'Workspace','workspace.subtitle':'Review changes, run quality checks and push with confidence.','common.refresh':'Refresh','workspace.switchProject':'Choose project','workspace.disconnect':'Disconnect project','workspace.connected':'Connected','workspace.lastCommit':'Last commit:','workspace.remotes':'remotes','workspace.history':'History','workspace.filesKicker':'WORKING TREE','workspace.filesTitle':'File changes','workspace.runLint':'Run quality check','workspace.file':'File','workspace.status':'Status','workspace.code':'Code','workspace.clean':'Working tree clean. No pending changes.','commit.typeFeat':'feat · New feature','commit.typeFix':'fix · Bug fix','commit.typeRefactor':'refactor · Refactor','commit.typeDocs':'docs · Documentation','commit.typeChore':'chore · Maintenance','stats.notConnected':'Not connected','account.connected':'Connected','account.repoCount':'repositories','account.email':'Email','collaborators.siteAdmin':'GitHub site admin','collaborators.member':'GitHub collaborator','commit.kicker':'DELIVERY FLOW','commit.title':'Commit & Push','commit.subtitle':'Changes are scanned automatically before sending.','commit.type':'Change type','commit.description':'Short description','commit.placeholder':'e.g. add project filters','commit.preview':'Commit message','commit.send':'Check and push','commit.localNote':'Uses your local Git credentials.','remote.kicker':'REMOTE REPOSITORIES','remote.title':'Git remotes','remote.empty':'No remote is configured yet.','remote.add':'Add remote','workspace.noProject':'Choose a project for your workspace','workspace.noProjectHint':'Connect a local Git repository to manage files, commits and remote settings.','workspace.chooseFolder':'Choose project folder','workspace.orExisting':'or choose one of your connected projects',
      'activity.eyebrow':'CHANGE HISTORY','activity.title':'Activity feed','activity.subtitle':'Review commits, contributors and work in the active repository.','activity.committed':'created a commit','activity.noHistory':'No commit history yet','activity.noHistoryHint':'Activity will appear here once you connect a project.','activity.historyKicker':'GIT LOG','activity.historyTitle':'Commit history','activity.localTab':'Local Git','activity.githubTab':'GitHub feed','activity.commits':'commits','activity.team':'View team contributions','activity.noProject':'Choose a project to view activity','activity.noProjectHint':'Connect a Git repository to inspect its commit history.',
      'collaborators.eyebrow':'TEAM AND ACCESS','collaborators.title':'Project collaborators','collaborators.subtitle':'View contributors and GitHub repository access permissions.','collaborators.activeRepo':'ACTIVE PROJECT','collaborators.githubRemote':'GitHub repository','collaborators.noGithubRemote':'No GitHub remote detected','collaborators.membersKicker':'REPOSITORY ACCESS','collaborators.membersTitle':'People with access','collaborators.inviteKicker':'MANAGE ACCESS','collaborators.inviteTitle':'Invite a collaborator','collaborators.inviteHint':'Enter a GitHub username and access level. The invitee may need to accept the invitation.','collaborators.username':'GitHub username','collaborators.usernamePlaceholder':'username','collaborators.permission':'Access level','permission.pull':'Read · View only','permission.triage':'Triage · Manage issues','permission.push':'Write · Push code','permission.maintain':'Maintain · Maintain repo','permission.admin':'Admin · Full control','collaborators.sendInvite':'Send invitation','collaborators.permissionNote':'This action uses the GitHub API and requires appropriate repository administration permissions.','collaborators.noRemoteTitle':'This project has no GitHub remote','collaborators.noRemoteHint':'Add a remote pointing to the GitHub repository to view collaborators.','collaborators.goWorkspace':'Open remote settings','collaborators.noProject':'Connect a project first','collaborators.noProjectHint':'Choose a local project linked to a GitHub repository to manage collaborators.',
      'account.eyebrow':'SOURCE CONTROL ACCOUNT','account.title':'Git account','account.subtitle':'Connect your GitHub identity, discover repositories you can access and bring projects into your local workspace.','account.profileKicker':'ACCOUNT STATUS','account.profileTitle':'GitHub connection','account.repositoriesKicker':'REMOTE REPOSITORIES','account.repositoriesTitle':'Your GitHub projects','account.searchRepos':'Search GitHub repositories','account.connectToSeeRepos':'Connect your GitHub account to view repositories.','account.connectTitle':'Connect GitHub account','account.connectHint':'Verify your account with a personal access token. The token is stored on this computer only.','account.tokenLabel':'Personal access token','account.tokenPlaceholder':'ghp_… or github_pat_…','account.connectButton':'Verify and connect account','account.securityNote':'The token is never displayed again in the UI. The local config file is stored with restricted file permissions.','account.disconnect':'Disconnect account','account.securityKicker':'ACCESS SCOPE','account.securityTitle':'Required permissions','account.scopeProfile':'View account and repository list','account.scopeProfileHint':'Profile, repository names and visibility','account.scopeCollaborators':'Manage collaborators','account.scopeCollaboratorsHint':'Repository admin access is required to list and change permissions','account.scopeWarning':'Use a token with the minimum permissions required. GitHub restricts actions based on token scope and your repository permissions.',
      'settings.eyebrow':'APP PREFERENCES','settings.title':'Settings','settings.subtitle':'Customize your GitFlow Manager experience and local data management.','settings.appearance':'Appearance','settings.appearanceHint':'Theme and language preferences are stored in this browser.','settings.theme':'Color theme','settings.themeHint':'Choose a light or dark appearance for your comfort.','settings.light':'Light','settings.dark':'Dark','settings.language':'Interface language','settings.languageHint':'Language for menus and system messages.','settings.reduceMotion':'Reduce motion','settings.reduceMotionHint':'Limit transitions according to motion preferences.','settings.localData':'Local data','settings.localDataHint':'GitFlow Manager records stored on this computer.','settings.projectsSaved':'Connected project list','settings.manageProjects':'Manage projects','settings.githubSaved':'GitHub token','settings.manageAccount':'Manage account','settings.securityTitle':'Local security first','settings.securityHint':'The app runs on 127.0.0.1. Git commands use argument lists rather than shell-concatenated strings.','settings.securityLocal':'Local interface restriction','settings.securityCsrf':'Request verification','settings.securityLint':'Pre-commit quality checks','settings.about':'Open-source developer tool','settings.aboutHint':'Git repository management, commit checks and team visibility in one local tool.',
      'common.loading':'Loading...','fileStatus.modified':'Modified','fileStatus.added':'Added','fileStatus.untracked':'Untracked','fileStatus.deleted':'Deleted','fileStatus.conflict':'Conflict','fileStatus.renamed':'Renamed','fileStatus.copied':'Copied','fileStatus.changed':'Changed',
      'toast.success':'Success','toast.pushExistingSuccess':'Previously created commits were pushed successfully.','toast.error':'Action failed','toast.connected':'Project connected.','toast.repositoryInitialized':'Git repository initialized and connected.','toast.disconnected':'Project disconnected.','toast.projectRemoved':'Project removed from the list.','toast.githubConnected':'GitHub account connected.','toast.githubDisconnected':'GitHub account disconnected.','toast.remoteSaved':'Remote saved.','toast.remoteRemoved':'Remote removed.','toast.collaboratorInvited':'Collaborator invitation sent.','toast.collaboratorRemoved':'Collaborator access removed.','toast.cloned':'Repository cloned locally.','toast.lintClean':'Quality checks are clean. Ready to push.','toast.noFindings':'No blocking issues found.','toast.confirmRemoveProject':'Remove this project from the GitFlow Manager list? Its files will not be deleted.','toast.confirmRemoveRemote':'Remove this remote connection?','toast.confirmDisconnectGithub':'Disconnect your GitHub account from this app?','toast.confirmRemoveCollaborator':'Remove this user\'s access to the repository?','error.repository_not_selected':'Choose a Git repository first.','error.repository_path_invalid':'The selected folder path is invalid.','error.repository_not_initialized':'The selected folder does not contain a Git repository yet.','repo.initializeConfirm':'This folder does not contain a Git repository yet. Initialize Git here? Existing files will not be deleted; you will still need to stage files before committing.','repo.nestedFound':'Git repositories were found inside the selected folder:','repo.nestedPrompt':'Enter the number of the repository to connect. Leave blank and press Enter to instead initialize the selected parent folder.','repo.invalidNestedChoice':'That is not a valid repository number. You can try selecting a folder again.','error.folder_picker_unavailable':'Could not open the folder picker. Python may need Tk support.','error.folder_selection_cancelled':'Folder selection was cancelled.','error.git_not_installed':'Git was not found. Check your Git installation.','error.remote_not_configured':'Add a Git remote first.','error.push_remote_ambiguous':'Could not choose a push remote automatically. Check the remote settings.','error.branch_detached':'Check out a branch before pushing.','error.nothing_to_commit':'There are no changes to commit.','error.invalid_commit_type':'Invalid commit type.','error.invalid_commit_description':'Check the commit description.','error.commit_description_too_short':'Description must contain at least 5 characters.','error.commit_description_period':'Description must not end with a period.','error.commit_message_too_long':'Commit message must be 72 characters or fewer.','error.lint_failed':'Quality checks found issues. No commit was created.','error.push_failed_after_commit':'Commit was created, but push failed.','error.github_not_connected':'Connect your GitHub account first.','error.github_token_invalid':'The GitHub token is invalid or expired.','error.github_token_invalid_format':'Check the token format.','error.github_permission_denied':'GitHub denied this action. Check token scope and repository permissions.','error.github_resource_not_found':'Repository or user not found, or you do not have access.','error.github_validation_failed':'GitHub could not validate the request. Check the username and permissions.','error.github_network_error':'Could not connect to the GitHub API. Check your internet connection.','error.github_remote_not_found':'Could not identify a GitHub repository from the active remote.','error.github_clone_url_invalid':'Choose a valid GitHub clone URL.','error.github_username_invalid':'Enter a valid GitHub username.','error.github_permission_invalid':'Choose a valid permission level.','error.github_clone_failed':'Could not clone the repository. Check remote access and Git authentication.','error.git_clone_failed':'Could not clone the GitHub repository. Check access and target folder.','error.clone_target_exists':'A folder with that name already exists at the selected location.','error.clone_target_invalid':'The clone target is invalid.','error.csrf_invalid':'Security verification failed. Refresh the page and try again.','error.git_timeout':'The Git operation timed out.','error.git_command_failed':'The Git command failed.','error.git_execution_failed':'Could not execute the Git command.','error.local_only':'The app can only be used from this local computer.','error.network_error':'Could not reach the local app. Check that it is running.','error.invalid_remote_name':'Invalid remote name.','error.invalid_remote_url':'Invalid remote URL.','error.invalid_remote_action':'Invalid remote action.','error.remote_not_found':'Remote not found.','error.github_collaborator_action_invalid':'Invalid collaborator action.','error.github_response_invalid':'Could not read the GitHub response.','error.github_api_error':'GitHub API request failed.','error.github_conflict':'GitHub reported a conflict for this operation.','error.unknown':'An unexpected error occurred.','modal.remoteAddTitle':'Add remote','modal.remoteEditTitle':'Edit remote','modal.remoteSubtitle':'Enter the remote URL for GitHub, GitLab or another Git provider.','modal.remoteName':'Remote name','modal.remoteUrl':'Fetch / push URL','modal.cancel':'Cancel','modal.save':'Save','modal.clone':'Clone','account.clone':'Clone locally','account.openGithub':'Open on GitHub','account.private':'Private','account.public':'Public','account.updated':'Updated','account.noRepos':'No repositories to display.','account.cloneHint':'Choose a folder to download this repository.','collaborators.noMembers':'The GitHub API returned no collaborators.','collaborators.role.admin':'Admin','collaborators.role.write':'Write','collaborators.role.read':'Read','collaborators.role.maintain':'Maintain','collaborators.role.triage':'Triage','collaborators.remove':'Remove access','collaborators.editAccess':'Edit access','collaborators.changeAccess':'Change access level','collaborators.accessUpdated':'Collaborator permission updated.','collaborators.invitedPending':'Invitation created; the recipient may need to accept it.','lint.findingsTitle':'Quality checks found blocking issues','lint.findingLine':'Line','lint.kind.console_log':'console.log residue','lint.kind.print_call':'print() call','lint.kind.debug_statement':'debugger residue','lint.kind.dd_call':'dd() call','lint.kind.unfinished_marker':'TODO marker','lint.kind.aws_key':'Possible AWS key','lint.kind.github_token':'Possible GitHub token','lint.kind.gitlab_token':'Possible GitLab token','lint.kind.service_key':'Possible service key','lint.kind.jwt':'Possible JWT token','lint.kind.private_key_header':'Private key marker','lint.kind.credential_assignment':'Sensitive credential assignment','lint.kind.file_too_large':'File exceeds scan limit','lint.kind.file_unreadable':'File could not be read'
    }
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const csrf = () => $('meta[name="csrf-token"]')?.content || window.GFM?.csrf || '';
  const t = (key) => translations[localStorage.getItem('gfm-language') || 'tr']?.[key] || translations.tr[key] || key;
  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const safeUrl = (value) => { try { const url = new URL(value); return url.protocol === 'https:' ? url.href : '#'; } catch { return '#'; } };
  const toast = (message, type = 'success', title = null) => {
    const region = $('#toastRegion'); if (!region) return;
    const node = document.createElement('div'); node.className = `toast ${type}`;
    node.innerHTML = `<i data-lucide="${type === 'error' ? 'alert-circle' : 'check-circle-2'}"></i><div><b>${esc(title || t(type === 'error' ? 'toast.error' : 'toast.success'))}</b><span>${esc(message)}</span></div>`;
    region.appendChild(node); iconRefresh(); setTimeout(() => node.remove(), 5200);
  };
  const friendlyError = (data) => {
    const base = t(`error.${data?.code || 'unknown'}`);
    if (data?.detail && !['github_network_error','git_command_failed','network_error'].includes(data.code)) return `${base} ${data.detail}`;
    return base;
  };
  async function api(url, method = 'GET', body = undefined) {
    const options = {method, headers: {'Accept':'application/json'}};
    if (method !== 'GET' && method !== 'HEAD') { options.headers['X-CSRF-Token'] = csrf(); options.headers['Content-Type'] = 'application/json'; if (body !== undefined) options.body = JSON.stringify(body); }
    let response;
    try { response = await fetch(url, options); } catch (error) { throw {code:'network_error', detail:error.message}; }
    const data = await response.json().catch(() => ({ok:false,code:'unknown'}));
    if (!response.ok || data.ok === false) throw data;
    return data;
  }
  function setBusy(button, busy, textKey = null) {
    if (!button) return;
    if (busy) { button.dataset.originalHtml = button.innerHTML; button.disabled = true; button.innerHTML = `<span class="spinner"></span><span>${esc(t('common.loading'))}</span>`; }
    else { button.disabled = false; if (button.dataset.originalHtml) { button.innerHTML = button.dataset.originalHtml; delete button.dataset.originalHtml; } }
    iconRefresh();
  }
  function iconRefresh() { if (window.lucide?.createIcons) window.lucide.createIcons({attrs:{'stroke-width':1.8}}); }
  function applyTranslations() {
    const lang = localStorage.getItem('gfm-language') || 'tr';
    document.documentElement.lang = lang;
    $$('[data-i18n]').forEach(element => {
      const value = translations[lang]?.[element.dataset.i18n] || translations.tr[element.dataset.i18n];
      if (value === undefined) return;
      const textNodes = [...element.childNodes].filter(node => node.nodeType === Node.TEXT_NODE);
      if (textNodes.length) { textNodes[0].nodeValue = value; textNodes.slice(1).forEach(node => node.remove()); }
      else element.appendChild(document.createTextNode(value));
    });
    $$('[data-i18n-placeholder]').forEach(element => { const value = translations[lang]?.[element.dataset.i18nPlaceholder] || translations.tr[element.dataset.i18nPlaceholder]; if (value !== undefined) element.placeholder = value; });
    const select = $('#languageSwitcher'); if (select) select.value = lang;
    const settingsSelect = $('#settingsLanguage'); if (settingsSelect) settingsSelect.value = lang;
    updateThemeButtons();
    iconRefresh();
  }
  function updateThemeButtons() {
    const theme = localStorage.getItem('gfm-theme') || 'dark';
    $$('[data-theme-choice]').forEach(button => button.classList.toggle('active', button.dataset.themeChoice === theme));
    const html = document.documentElement; html.classList.toggle('dark', theme === 'dark'); html.dataset.theme = theme;
    const meta = $('meta[name="theme-color"]'); if (meta) meta.content = theme === 'dark' ? '#0b1020' : '#f5f7fb';
    const toggle = $('#themeToggle'); if (toggle) { toggle.innerHTML = `<i data-lucide="${theme === 'dark' ? 'sun' : 'moon'}"></i>`; toggle.title = theme === 'dark' ? (localStorage.getItem('gfm-language') === 'en' ? 'Switch to light theme' : 'Açık temaya geç') : (localStorage.getItem('gfm-language') === 'en' ? 'Switch to dark theme' : 'Koyu temaya geç'); }
    iconRefresh();
  }
  function setTheme(theme) { localStorage.setItem('gfm-theme', theme); updateThemeButtons(); }
  function setLanguage(language) {
    localStorage.setItem('gfm-language', language === 'en' ? 'en' : 'tr'); applyTranslations();
    if (window.GFM?.page === 'dashboard') renderOverview();
    if (window.GFM?.page === 'account') loadGithubStatus();
    if (window.GFM?.page === 'collaborators') loadCollaborators();
    if (window.GFM?.page === 'activity' && $('#commitTimeline')) loadActivitySource(activitySource);
    if (window.GFM?.page === 'workspace' && window.GFM?.activeStatus?.repository) refreshStatus().catch(() => {});
    const lint = $('#lintResult'); if (lint && !lint.classList.contains('hidden') && lastLintFindings) renderLint(lastLintFindings);
  }
  function formatDate(value) { if (!value) return ''; const date = new Date(value); if (Number.isNaN(date.getTime())) return value; return new Intl.DateTimeFormat(localStorage.getItem('gfm-language') === 'en' ? 'en-US' : 'tr-TR', {dateStyle:'medium', timeStyle:'short'}).format(date); }
  function fileState(state) { const key = `fileStatus.${state}`; return t(key); }
  function renderFiles(status) {
    const body = $('#changedFilesBody'); if (!body) return;
    const count = $('#changedFileCount'); if (count) count.textContent = status.changed_count ?? status.files?.length ?? 0;
    const files = status.files || [];
    body.innerHTML = files.length ? files.map(file => `<tr><td><span class="file-name"><i data-lucide="file-code-2"></i><span title="${esc(file.path)}">${esc(file.path)}</span></span></td><td><span class="file-status file-${esc(file.state)}">${esc(fileState(file.state))}</span></td><td><code class="xy-code">${esc(file.xy)}</code></td></tr>`).join('') : `<tr><td colspan="3"><div class="table-empty"><i data-lucide="check-circle-2"></i><span>${esc(t('workspace.clean'))}</span></div></td></tr>`;
    iconRefresh();
  }
  function renderRemotes(status) {
    const list = $('#remoteList'); if (!list) return;
    list.innerHTML = (status.remotes || []).map(remote => `<div class="remote-row"><span class="remote-icon"><i data-lucide="radio-tower"></i></span><div class="remote-copy"><b>${esc(remote.name)}</b><small title="${esc(remote.fetch_url)}">${esc(remote.fetch_url)}</small>${remote.push_url !== remote.fetch_url ? `<small title="${esc(remote.push_url)}">Push: ${esc(remote.push_url)}</small>` : ''}</div><button class="icon-button tiny" data-action="edit-remote" data-name="${esc(remote.name)}" data-url="${esc(remote.fetch_url)}" title="Edit remote"><i data-lucide="pencil"></i></button><button class="icon-button tiny danger-hover" data-action="remove-remote" data-name="${esc(remote.name)}" title="Remove remote"><i data-lucide="trash-2"></i></button></div>`).join('') || `<div class="empty-inline compact">${esc(t('remote.empty'))}</div>`;
    const count = $('#workspaceRemoteCount'); if (count) count.textContent = (status.remotes || []).length;
    iconRefresh();
  }
  function updateWorkspaceStatus(status) {
    if (!status) return;
    window.GFM.activeStatus = status;
    const fields = {'#headerActiveProject':status.repository_name,'#workspaceRepoName':status.repository_name,'#workspaceRepoPath':status.repository,'#workspaceBranch':status.branch,'#workspaceLastCommit':status.last_commit?.hash || '—'};
    Object.entries(fields).forEach(([selector, value]) => { const el = $(selector); if (el) el.textContent = value || '—'; });
    const statChanges = $('#statChanges'); if (statChanges) statChanges.textContent = status.changed_count ?? 0;
    const branch = $('#statBranch'); if (branch) branch.textContent = status.branch || '—';
    renderFiles(status); renderRemotes(status);
  }
  async function refreshStatus() { try { const data = await api('/api/status'); updateWorkspaceStatus(data); return data; } catch (error) { toast(friendlyError(error), 'error'); throw error; } }
  async function handleUninitializedFolder(error) {
    const path = error.selected_path;
    if (!path) { toast(friendlyError(error), 'error'); return; }
    const nested = Array.isArray(error.nested_repositories) ? error.nested_repositories : [];
    if (nested.length) {
      const choices = nested.map((repo, index) => `${index + 1}. ${repo.name} — ${repo.path}`).join('\n');
      const choice = prompt(`${t('repo.nestedFound')}\n\n${choices}\n\n${t('repo.nestedPrompt')}`);
      if (choice === null) return;
      if (choice.trim()) {
        const number = Number(choice.trim());
        if (!Number.isInteger(number) || number < 1 || number > nested.length) { toast(t('repo.invalidNestedChoice'), 'error'); return; }
        try {
          const result = await api('/api/repository', 'POST', {path: nested[number - 1].path});
          updateWorkspaceStatus(result); toast(t('toast.connected')); window.location.href = '/workspace';
        } catch (connectionError) { toast(friendlyError(connectionError), 'error'); }
        return;
      }
    }
    if (!confirm(`${t('repo.initializeConfirm')}\n\n${path}`)) return;
    try {
      const result = await api('/api/repository/initialize', 'POST', {path});
      updateWorkspaceStatus(result); toast(t(result.initialized ? 'toast.repositoryInitialized' : 'toast.connected')); window.location.href = '/workspace';
    } catch (initializeError) { toast(friendlyError(initializeError), 'error'); }
  }
  async function browseRepository(button = null) {
    setBusy(button, true);
    try {
      const result = await api('/api/browse', 'POST', {});
      updateWorkspaceStatus(result); toast(t('toast.connected')); window.location.href = '/workspace';
    } catch (error) {
      if (error.code === 'repository_not_initialized' && error.selected_path) await handleUninitializedFolder(error);
      else if (error.code !== 'folder_selection_cancelled') toast(friendlyError(error), 'error');
    } finally { setBusy(button, false); }
  }
  async function activateProject(path, button) {
    setBusy(button, true);
    try { const result = await api('/api/repository', 'POST', {path}); updateWorkspaceStatus(result); toast(t('toast.connected')); window.location.href = '/dashboard'; }
    catch (error) { toast(friendlyError(error), 'error'); setBusy(button, false); }
  }
  async function forgetProject(path, button) {
    if (!confirm(t('toast.confirmRemoveProject'))) return;
    setBusy(button, true);
    try { await api('/api/repositories/remove', 'POST', {path}); toast(t('toast.projectRemoved')); window.location.reload(); }
    catch (error) { toast(friendlyError(error), 'error'); setBusy(button, false); }
  }
  async function disconnectProject(button) {
    setBusy(button, true);
    try { await api('/api/disconnect', 'POST', {}); toast(t('toast.disconnected')); window.location.href = '/projects'; }
    catch (error) { toast(friendlyError(error), 'error'); setBusy(button, false); }
  }
  function filterProjects() {
    const search = ($('#projectSearch')?.value || '').toLowerCase().trim(); const filter = $('#projectFilter')?.value || 'all'; let shown = 0;
    $$('[data-project-card]').forEach(card => {
      const textMatch = `${card.dataset.name} ${card.dataset.path}`.includes(search);
      const available = card.dataset.available === 'true'; const changes = Number(card.dataset.changes || 0) > 0;
      const filterMatch = filter === 'all' || (filter === 'available' && available) || (filter === 'missing' && !available) || (filter === 'changes' && changes);
      card.classList.toggle('hidden', !(textMatch && filterMatch)); if (textMatch && filterMatch) shown++;
    });
    const empty = $('#projectSearchEmpty'); if (empty) empty.classList.toggle('hidden', shown > 0 || $$('[data-project-card]').length === 0);
  }
  function modal({title, subtitle, name = '', url = ''}) {
    const root = $('#modalRoot'); if (!root) return;
    root.innerHTML = `<div class="modal-backdrop" data-modal-backdrop><section class="modal-card" role="dialog" aria-modal="true"><div class="modal-heading"><div><h2>${esc(title)}</h2><p>${esc(subtitle)}</p></div><button class="icon-button" data-action="close-modal"><i data-lucide="x"></i></button></div><form id="remoteForm" class="modal-form"><label for="remoteName" class="form-label">${esc(t('modal.remoteName'))}</label><input id="remoteName" class="form-control" required maxlength="64" value="${esc(name)}" autocomplete="off"><label for="remoteUrl" class="form-label">${esc(t('modal.remoteUrl'))}</label><input id="remoteUrl" class="form-control" type="url" required maxlength="2048" value="${esc(url)}" placeholder="https://github.com/owner/repository.git" autocomplete="off"><div class="modal-actions"><button type="button" class="button button-secondary" data-action="close-modal">${esc(t('modal.cancel'))}</button><button type="submit" class="button button-primary" id="remoteSaveButton">${esc(t('modal.save'))}</button></div></form></section></div>`;
    iconRefresh(); $('#remoteName')?.focus();
  }
  function closeModal() { const root = $('#modalRoot'); if (root) root.innerHTML = ''; }
  async function saveRemote(event) {
    event.preventDefault(); const button = $('#remoteSaveButton'); setBusy(button, true);
    try { const result = await api('/api/remote', 'POST', {action:'save',name:$('#remoteName').value.trim(),url:$('#remoteUrl').value.trim()}); closeModal(); updateWorkspaceStatus(result.status); toast(t('toast.remoteSaved')); }
    catch (error) { toast(friendlyError(error), 'error'); setBusy(button, false); }
  }
  async function removeRemote(name, button) {
    if (!confirm(t('toast.confirmRemoveRemote'))) return; setBusy(button, true);
    try { const result = await api('/api/remote', 'POST', {action:'remove',name}); updateWorkspaceStatus(result.status); toast(t('toast.remoteRemoved')); }
    catch (error) { toast(friendlyError(error), 'error'); setBusy(button, false); }
  }
  let lastLintFindings = null;
  function renderLint(findings, resultNode) {
    lastLintFindings = findings;
    const target = resultNode || $('#lintResult'); if (!target) return;
    target.classList.remove('hidden'); target.classList.toggle('error', findings.length > 0); target.classList.toggle('success', findings.length === 0);
    if (!findings.length) { target.innerHTML = `<b>${esc(t('toast.lintClean'))}</b><div>${esc(t('toast.noFindings'))}</div>`; }
    else { target.innerHTML = `<b>${esc(t('lint.findingsTitle'))} (${findings.length})</b><ul class="finding-list">${findings.map(f => `<li><b>${esc(t(`lint.kind.${f.kind}`) || f.kind)}</b> — ${esc(f.file)}${f.line ? ` · ${esc(t('lint.findingLine'))} ${f.line}` : ''}</li>`).join('')}</ul>`; }
    iconRefresh();
  }
  async function runLint(button) { setBusy(button, true); try { const result = await api('/api/lint', 'POST', {}); renderLint(result.findings || []); if (!result.findings?.length) toast(t('toast.lintClean')); } catch (error) { toast(friendlyError(error), 'error'); } finally { setBusy(button, false); } }
  async function submitCommit(event) {
    event.preventDefault(); const button = $('#commitSubmit'); const description = $('#commitDescription')?.value || ''; const type = $('#commitType')?.value || 'feat'; const resultNode = $('#commitResult'); if (resultNode) { resultNode.className = 'operation-result hidden'; resultNode.textContent = ''; }
    setBusy(button, true);
    try {
      const result = await api('/api/commit-push', 'POST', {type,description});
      const successMessage = result.code === 'push_existing_success' ? t('toast.pushExistingSuccess') : (result.message || t('toast.success'));
      if (resultNode) { resultNode.className = 'operation-result success'; resultNode.textContent = `${successMessage}${result.push_output || result.commit_output ? ` · ${result.push_output || result.commit_output}` : ''}`; }
      toast(result.code === 'push_existing_success' ? t('toast.pushExistingSuccess') : t('toast.success')); $('#commitDescription').value = ''; updateWorkspaceStatus(result.status); const lint = $('#lintResult'); if (lint) lint.classList.add('hidden');
    } catch (error) {
      if (resultNode) { resultNode.className = 'operation-result error'; resultNode.textContent = friendlyError(error); if (error.findings) { resultNode.innerHTML = `<b>${esc(t('lint.findingsTitle'))}</b><ul class="finding-list">${error.findings.map(f => `<li>${esc(t(`lint.kind.${f.kind}`))} — ${esc(f.file)}${f.line ? ` · ${esc(t('lint.findingLine'))} ${f.line}` : ''}</li>`).join('')}</ul>`; } }
      toast(friendlyError(error), 'error');
    } finally { setBusy(button, false); updateCommitPreview(); }
  }
  function updateCommitPreview() { const out = $('#commitPreview'); if (out) out.textContent = `${$('#commitType')?.value || 'feat'}: ${$('#commitDescription')?.value.trim() || (localStorage.getItem('gfm-language') === 'en' ? 'description' : 'açıklama')}`; }
  function renderActivity(items, node = $('#commitTimeline')) {
    if (!node) return;
    const avatarLetter = value => esc((value || '?').slice(0,1).toUpperCase());
    node.innerHTML = items.length ? items.map(item => `<article class="timeline-item"><span class="timeline-node"><i data-lucide="git-commit-horizontal"></i></span><div class="timeline-content"><div class="timeline-top"><h3>${esc(item.subject)}</h3><code>${esc(item.hash)}</code></div><div class="timeline-meta"><span class="contributor-avatar">${avatarLetter(item.author)}</span><b>${esc(item.author)}</b><span>${esc(item.email)}</span><span class="timeline-date"><i data-lucide="clock-3"></i>${esc(formatDate(item.date))}</span></div></div></article>`).join('') : `<div class="empty-inline"><b>${esc(t('activity.noHistory'))}</b><span>${esc(t('activity.noHistoryHint'))}</span></div>`;
    const count = $('#activityCount'); if (count) count.innerHTML = `${items.length} <span>${esc(t('activity.commits'))}</span>`;
    iconRefresh();
  }
  let activitySource = 'local';
  function setActivitySource(source) {
    activitySource = source;
    $$('[data-source]').forEach(button => button.classList.toggle('active', button.dataset.source === source));
  }
  async function loadActivitySource(source, button = null) {
    setActivitySource(source); setBusy(button, Boolean(button));
    try {
      const result = source === 'github' ? await api('/api/github/activity') : await api('/api/activity?limit=60');
      renderActivity(result.activity || []);
    } catch (error) {
      toast(friendlyError(error), 'error');
      if (source === 'github') setActivitySource('local');
    } finally { setBusy(button, false); }
  }
  async function refreshActivity(button) { await loadActivitySource(activitySource, button); }
  async function renderOverview() {
    try {
      const data = await api('/api/overview');
      if ($('#statProjects')) $('#statProjects').textContent = data.project_count;
      if ($('#sidebarProjectCount')) $('#sidebarProjectCount').textContent = data.project_count;
      if ($('#statChanges')) $('#statChanges').textContent = data.changed_count;
      if ($('#statBranch')) $('#statBranch').textContent = data.active_branch || '—';
      if ($('#statGithub')) $('#statGithub').textContent = data.github?.connected ? `@${data.github.login}` : t('stats.notConnected');
      const dot = $('#githubSidebarDot'); if (dot) dot.classList.toggle('connected', Boolean(data.github?.connected));
      const feed = $('#dashboardActivity');
      if (feed) {
        const items = data.activity || [];
        feed.innerHTML = items.length ? items.map(item => `<div class="activity-row"><div class="activity-avatar">${esc((item.author || '?').slice(0,1).toUpperCase())}</div><div class="activity-main"><div><b>${esc(item.author)}</b><span>${esc(t('activity.committed'))}</span></div><p>${esc(item.subject)}</p><small>${esc(formatDate(item.date))}</small></div><code>${esc(item.hash)}</code></div>`).join('') : `<div class="empty-inline"><span class="empty-icon"><i data-lucide="git-commit"></i></span><b>${esc(t('activity.noHistory'))}</b><span>${esc(t('activity.noHistoryHint'))}</span></div>`;
        iconRefresh();
      }
    } catch (error) {}
  }
  async function loadGithubStatus() {
    const content = $('#githubProfileContent'); if (!content) return;
    content.innerHTML = `<div class="loading-inline"><span class="spinner"></span><span>${esc(t('common.loading'))}</span></div>`;
    try {
      const result = await api('/api/github/status');
      if (!result.connected) {
        content.innerHTML = `<div class="empty-inline compact"><span class="empty-icon"><i data-lucide="github"></i></span><b>${esc(t('account.connectTitle'))}</b><span>${esc(t('account.connectHint'))}</span></div>`;
        $('#githubDisconnectButton')?.classList.add('hidden');
        if ($('#githubRepositoryList')) $('#githubRepositoryList').innerHTML = `<div class="empty-inline compact">${esc(t('account.connectToSeeRepos'))}</div>`;
        iconRefresh(); return;
      }
      const profile = result.profile;
      content.innerHTML = `<div class="profile-connected"><img class="profile-avatar" src="${esc(safeUrl(profile.avatar_url))}" alt=""><div class="profile-main"><h3>${esc(profile.name)}</h3><a href="${esc(safeUrl(profile.html_url))}" target="_blank" rel="noreferrer">@${esc(profile.login)} <i data-lucide="external-link"></i></a>${profile.bio ? `<p>${esc(profile.bio)}</p>` : ''}${profile.company ? `<p>${esc(profile.company)}</p>` : ''}</div><span class="status-badge status-success"><span></span>${esc(t('account.connected'))}</span></div><div class="profile-stats"><div class="profile-stat"><b>${Number(profile.public_repos || 0)}</b><small>${esc(t('account.public'))} ${esc(t('account.repoCount'))}</small></div><div class="profile-stat"><b>${Number(profile.total_private_repos || 0)}</b><small>${esc(t('account.private'))} ${esc(t('account.repoCount'))}</small></div>${profile.email ? `<div class="profile-stat"><b>${esc(profile.email)}</b><small>${esc(t('account.email'))}</small></div>` : ''}</div>`;
      $('#githubDisconnectButton')?.classList.remove('hidden');
      const dot = $('#githubSidebarDot'); if (dot) dot.classList.add('connected');
      const stat = $('#statGithub'); if (stat) stat.textContent = `@${profile.login}`;
      await loadGithubRepos(); iconRefresh();
    } catch (error) {
      content.innerHTML = `<div class="operation-result error">${esc(friendlyError(error))}</div>`;
      if (error.code === 'github_token_invalid') { $('#githubDisconnectButton')?.classList.remove('hidden'); }
    }
  }
  function renderGithubRepos(repos) {
    const list = $('#githubRepositoryList'); if (!list) return;
    const query = ($('#githubRepoSearch')?.value || '').toLowerCase().trim();
    const filtered = repos.filter(repo => `${repo.full_name} ${repo.description} ${repo.language}`.toLowerCase().includes(query));
    list.innerHTML = filtered.length ? filtered.map(repo => `<article class="github-repo-row" data-github-repo data-name="${esc(repo.full_name.toLowerCase())}"><span class="github-repo-icon"><i data-lucide="book-git"></i></span><div class="github-repo-info"><div><b>${esc(repo.full_name)}</b><span class="visibility-badge">${esc(t(repo.private ? 'account.private' : 'account.public'))}</span></div><small>${esc(repo.description || repo.default_branch || '')}</small><small>${repo.language ? `<span class="repo-language-dot"></span>${esc(repo.language)} · ` : ''}${esc(t('account.updated'))} ${esc(formatDate(repo.updated_at))}</small></div><div class="github-repo-actions"><a class="icon-button tiny" href="${esc(safeUrl(repo.html_url))}" target="_blank" rel="noreferrer" title="${esc(t('account.openGithub'))}"><i data-lucide="external-link"></i></a><button class="button button-secondary button-small" data-action="clone-github-repo" data-clone-url="${esc(repo.clone_url)}"><i data-lucide="download"></i><span>${esc(t('account.clone'))}</span></button></div></article>`).join('') : `<div class="empty-inline compact">${esc(t('account.noRepos'))}</div>`;
    iconRefresh();
  }
  let cachedGithubRepos = [];
  async function loadGithubRepos(button = null) {
    const list = $('#githubRepositoryList'); if (!list) return;
    setBusy(button, Boolean(button));
    try { const result = await api('/api/github/repos'); cachedGithubRepos = result.repositories || []; renderGithubRepos(cachedGithubRepos); }
    catch (error) { list.innerHTML = `<div class="operation-result error">${esc(friendlyError(error))}</div>`; }
    finally { setBusy(button, false); }
  }
  async function connectGithub(event) {
    event.preventDefault(); const button = $('#githubConnectButton'); const token = $('#githubToken')?.value || ''; setBusy(button, true);
    try { await api('/api/github/connect', 'POST', {token}); $('#githubToken').value = ''; toast(t('toast.githubConnected')); await loadGithubStatus(); await renderOverview(); }
    catch (error) { toast(friendlyError(error), 'error'); }
    finally { setBusy(button, false); }
  }
  async function disconnectGithub(button) {
    if (!confirm(t('toast.confirmDisconnectGithub'))) return; setBusy(button, true);
    try { await api('/api/github/disconnect', 'POST', {}); toast(t('toast.githubDisconnected')); cachedGithubRepos = []; await loadGithubStatus(); await renderOverview(); }
    catch (error) { toast(friendlyError(error), 'error'); }
    finally { setBusy(button, false); }
  }
  async function cloneGithubRepo(cloneUrl, button) {
    setBusy(button, true);
    try { const result = await api('/api/github/clone', 'POST', {clone_url:cloneUrl}); toast(t('toast.cloned')); window.location.href = '/workspace'; }
    catch (error) { if (error.code !== 'folder_selection_cancelled') toast(friendlyError(error), 'error'); setBusy(button, false); }
  }
  async function loadCollaborators() {
    const list = $('#collaboratorList'); if (!list) return;
    list.innerHTML = `<div class="loading-inline"><span class="spinner"></span><span>${esc(t('common.loading'))}</span></div>`;
    try {
      const result = await api('/api/github/collaborators'); const people = result.collaborators || [];
      if ($('#collaboratorCount')) $('#collaboratorCount').textContent = people.length;
      if ($('#collaboratorProjectName')) $('#collaboratorProjectName').textContent = result.project.full_name;
      list.innerHTML = people.length ? people.map(person => `<article class="collaborator-row"><a class="collaborator-avatar-img" href="${esc(safeUrl(person.html_url))}" target="_blank" rel="noreferrer">${person.avatar_url ? `<img src="${esc(safeUrl(person.avatar_url))}" alt="">` : esc((person.login || '?').slice(0,1).toUpperCase())}</a><div class="collaborator-info"><b>${esc(person.login)}</b><small>${esc(t(person.site_admin ? 'collaborators.siteAdmin' : 'collaborators.member'))}</small></div><span class="role-badge">${esc(t(`collaborators.role.${person.role}`) || person.role)}</span><div class="collaborator-actions"><button class="icon-button tiny" data-action="edit-collaborator" data-username="${esc(person.login)}" data-role="${esc(person.role)}" title="${esc(t('collaborators.editAccess'))}"><i data-lucide="user-cog"></i></button><button class="icon-button tiny danger-hover" data-action="remove-collaborator" data-username="${esc(person.login)}" title="${esc(t('collaborators.remove'))}"><i data-lucide="user-round-x"></i></button></div></article>`).join('') : `<div class="empty-inline compact"><b>${esc(t('collaborators.noMembers'))}</b></div>`;
    } catch (error) { list.innerHTML = `<div class="operation-result error">${esc(friendlyError(error))}</div>`; if (error.code === 'github_not_connected') list.innerHTML += `<a class="inline-link" href="/account">${esc(t('account.connectTitle'))} <i data-lucide="arrow-right"></i></a>`; }
    iconRefresh();
  }
  let editingCollaborator = false;
  async function updateCollaborator(event) {
    event.preventDefault(); const button = $('#inviteCollaborator'); setBusy(button, true);
    try {
      const result = await api('/api/github/collaborators', 'POST', {action:'invite',username:$('#collaboratorUsername').value.trim(),permission:$('#collaboratorPermission').value});
      $('#collaboratorUsername').value = '';
      toast(t(editingCollaborator ? 'collaborators.accessUpdated' : (result.result?.status === 201 ? 'collaborators.invitedPending' : 'toast.collaboratorInvited')));
      editingCollaborator = false;
      await loadCollaborators();
    } catch (error) { toast(friendlyError(error), 'error'); }
    finally { setBusy(button, false); if (button) button.innerHTML = `<i data-lucide="user-plus"></i><span>${esc(t('collaborators.sendInvite'))}</span>`; iconRefresh(); }
  }
  async function removeCollaborator(username, button) {
    if (!confirm(t('toast.confirmRemoveCollaborator'))) return; setBusy(button, true);
    try { await api('/api/github/collaborators', 'POST', {action:'remove',username}); toast(t('toast.collaboratorRemoved')); await loadCollaborators(); }
    catch (error) { toast(friendlyError(error), 'error'); setBusy(button, false); }
  }
  function closeMobileMenu() { $('#sidebar')?.classList.remove('open'); $('#mobileOverlay')?.classList.remove('show'); }
  document.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-action]');
    if (!button) { if (event.target.matches('[data-modal-backdrop]')) closeModal(); return; }
    const action = button.dataset.action;
    if (action === 'browse-repository') await browseRepository(button);
    else if (action === 'activate-project') await activateProject(button.dataset.path, button);
    else if (action === 'forget-project') await forgetProject(button.dataset.path, button);
    else if (action === 'disconnect-project') await disconnectProject(button);
    else if (action === 'refresh-projects') window.location.reload();
    else if (action === 'refresh-status') { setBusy(button,true); try { await refreshStatus(); toast(t('toast.success')); } finally { setBusy(button,false); } }
    else if (action === 'add-remote') modal({title:t('modal.remoteAddTitle'),subtitle:t('modal.remoteSubtitle')});
    else if (action === 'edit-remote') modal({title:t('modal.remoteEditTitle'),subtitle:t('modal.remoteSubtitle'),name:button.dataset.name,url:button.dataset.url});
    else if (action === 'close-modal') closeModal();
    else if (action === 'remove-remote') await removeRemote(button.dataset.name, button);
    else if (action === 'run-lint') await runLint(button);
    else if (action === 'refresh-activity') await refreshActivity(button);
    else if (action === 'show-local-activity') await loadActivitySource('local', button);
    else if (action === 'show-github-activity') await loadActivitySource('github', button);
    else if (action === 'refresh-collaborators') await loadCollaborators();
    else if (action === 'refresh-github-repos') await loadGithubRepos(button);
    else if (action === 'disconnect-github') await disconnectGithub(button);
    else if (action === 'clone-github-repo') await cloneGithubRepo(button.dataset.cloneUrl, button);
    else if (action === 'remove-collaborator') await removeCollaborator(button.dataset.username, button);
    else if (action === 'edit-collaborator') { editingCollaborator = true; const roleMap = {admin:'admin',write:'push',read:'pull',maintain:'maintain',triage:'triage'}; if ($('#collaboratorUsername')) $('#collaboratorUsername').value = button.dataset.username; if ($('#collaboratorPermission')) $('#collaboratorPermission').value = roleMap[button.dataset.role] || 'push'; const submit = $('#inviteCollaborator'); if (submit) submit.innerHTML = `<i data-lucide="user-cog"></i><span>${esc(t('collaborators.changeAccess'))}</span>`; $('#collaboratorUsername')?.focus(); $('.invite-panel')?.scrollIntoView({behavior:document.documentElement.classList.contains('reduce-motion')?'auto':'smooth',block:'center'}); toast(t('collaborators.changeAccess')); iconRefresh(); }
    if (action !== 'close-modal') closeMobileMenu();
  });
  document.addEventListener('submit', async (event) => {
    if (event.target.id === 'remoteForm') await saveRemote(event);
    if (event.target.id === 'commitForm') await submitCommit(event);
    if (event.target.id === 'githubConnectForm') await connectGithub(event);
    if (event.target.id === 'collaboratorForm') await updateCollaborator(event);
  });
  $('#themeToggle')?.addEventListener('click', () => setTheme((localStorage.getItem('gfm-theme') || 'dark') === 'dark' ? 'light' : 'dark'));
  $('#languageSwitcher')?.addEventListener('change', event => setLanguage(event.target.value));
  $('#settingsLanguage')?.addEventListener('change', event => setLanguage(event.target.value));
  $$('[data-theme-choice]').forEach(button => button.addEventListener('click', () => setTheme(button.dataset.themeChoice)));
  $('#mobileMenuButton')?.addEventListener('click', () => { $('#sidebar')?.classList.add('open'); $('#mobileOverlay')?.classList.add('show'); });
  $('#mobileOverlay')?.addEventListener('click', closeMobileMenu);
  $('#projectSearch')?.addEventListener('input', filterProjects); $('#projectFilter')?.addEventListener('change', filterProjects);
  $('#githubRepoSearch')?.addEventListener('input', () => renderGithubRepos(cachedGithubRepos));
  $('#commitType')?.addEventListener('change', updateCommitPreview); $('#commitDescription')?.addEventListener('input', updateCommitPreview);
  $('#reduceMotion')?.addEventListener('change', event => { document.documentElement.classList.toggle('reduce-motion', event.target.checked); localStorage.setItem('gfm-reduce-motion', event.target.checked ? '1' : '0'); });
  async function init() {
    setTheme(localStorage.getItem('gfm-theme') || 'dark'); setLanguage(localStorage.getItem('gfm-language') || 'tr');
    const reduce = localStorage.getItem('gfm-reduce-motion') === '1'; document.documentElement.classList.toggle('reduce-motion', reduce); if ($('#reduceMotion')) $('#reduceMotion').checked = reduce;
    iconRefresh(); updateCommitPreview();
    if (window.GFM?.page === 'dashboard') await renderOverview();
    if (window.GFM?.page === 'account') await loadGithubStatus();
    if (window.GFM?.page === 'collaborators' && $('#collaboratorList')) await loadCollaborators();
    if (window.GFM?.page === 'activity' && $('#commitTimeline')) await loadActivitySource('local');
  }
  init();
})();
